import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import prisma from './prisma/prisma.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { addBlogpost, addUser, getAllPosts, getPublishPost, getUnpublishPosts, getSinglePost, publishPost, addComment, findUser, getAllComments } from './prisma/prismaQueries.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import {Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import cookieParser from 'cookie-parser';
import {S3Client, ListBucketsCommand, PutObjectCommand} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import { updateRole } from './prisma/prismaQueries.js';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
const s3 = new S3Client({
    credentials: {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRECT_ACCESS_KEY
    }, 
    region : 'us-east-2'
});
const BUCKET_NAME = 'fadestoblogsite';
const CLOUDFRONT_URL = 'https://d3amjv0mo6dgie.cloudfront.net';


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true
}))

// app.use(session({
//     cookie : {
//         maxAge : 7*25*60*1000
//     },
//     secret : 'biggiethegreat',
//     resave : false,
//     saveUninitialized : false,
//     store : new PrismaSessionStore(
//         prisma, {
//             checkPeriod : 2 * 60 * 1000,
//             dbRecordIdIsSessionId : false
//         } 
//     )
// }));

passport.use(
    new LocalStrategy ( async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where : {
                    username
                }
        })
        if (!user){
            console.log("User not found when logging in");
            return done (null, false, {message : 'User not found'});
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match){
            console.log('Incorrect password');
            return done (null, false, {message : 'Incorrect password'});
        }
        return done(null, user);
        } catch (err) {
            console.error('Error trying to log in', err);
            return done(err);
        }
    })
);

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_KEY
}

passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) =>{
        try {
            const user = await prisma.user.findUnique({
                where : {
                    id : jwtPayload.id
                }
            })
            if (!user) {
                return done (null, false);
            }
            return done(null, user);
        } catch (err) {
            console.error(err);
            return done (err, false);
        }
    } )
)

passport.use(new GoogleStrategy({
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : 'http://localhost:5173/auth/google/callback'
    },
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const { id, displayName, emails } = profile;
            const nameParts = displayName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');
            const email = emails[0].value;
            let user = await prisma.user.findUnique({
                where : {
                    googleId : id
                }
            })
            if (!user) {
                user = await prisma.user.create({
                    data : {
                        googleId : id,
                        firstName,
                        lastName,
                        email,
                        role : 'GUEST'

                    }
                })
            }
            cb(null, user);
        } catch (err) {
            cb (err,null);
        }


    }
));


passport.serializeUser((user, done) => {
    done (null, user );
});
passport.deserializeUser(async (user,done) => {
    try {
        const userMatch = await prisma.user.findUnique({
            where : {id : user.id}
        });
        if (!userMatch){
            console.log("Error deserializing user");
            return done(null, false);
        }
        return done (null, user);
    } catch (err) {
        done (err);
    }
});


app.use(passport.initialize());
// app.use(passport.session());
app.use((req,res,next)=>{
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.locals.user = req.user;
    next();
});

app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {session : false}), (req,res)=>{
    if (!req.user){
        return res.status(401).json({message : 'Google authentication failed'});
    }
    res.json({message : 'Google authentication success!', user: req.user});
})


app.get('/', (req,res)=>{
    res.send('Hello from the backend');
});

app.post('/sign-up', async (req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData = {
        firstName,
        lastName,
        username,
        email,
        password : hashedPassword
    }
    try {
        await addUser( userData );
        res.json({message : 'Signed up successfully'});

    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Something went wrong. Please try again.'});
    }


});

app.post('/login', (req,res, next)=>{
    passport.authenticate('local', (err, user, info) => {
        if (err){
            console.error('Authentication Error', err);
            return res.status(500).json({error : 'Internal server error'});
        }
        if (!user){
            console.warn('Authentication failed', info);
            return res.status(401).json({error : info.message})
        }

        const token = jwt.sign(
            {id : user.id, username : user.username, firstName : user.firstName, lastName : user.lastName, role : user.role, email : user.email},
            process.env.JWT_KEY,
            {expiresIn : '1h'}
        )

        // console.log('Token from backend: ', token);
        res.cookie('JWT', token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : 'strict',
            maxAge : 1000*60*60,
        });
        res.json({message : 'Login successful', user});
    })(req,res,next);
    
})


app.post('/logout', (req,res)=>{
    console.log('cookei to be cleard: ', JSON.parse(req.cookies.g_state));
    res.clearCookie('JWT', {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : 'strict'
    })
    res.json({message : 'Successfully Logged Out'});
})

app.get('/admin', (req,res,next) => {
    passport.authenticate('jwt', {session : false}, (err, user, info) => {
        if (err) {
            res.status(401).json({message : 'Error'});
        }
        if (!user) {
            console.error('User not authorized');
            res.status(401).json({message : 'Unauthorized'})
        }
        res.json({message : 'Accessed protected route', user : req.user})
    })(req,res,next);
})

const authenticateToken = (req,res,next) => {
    
    console.log('Req  Cookies is ', req.cookies);
    const token =  req.cookies ? req.cookies.JWT : null ;
    if (!token) {
        console.warn('Not token found in cookies');
        return res.status(200).json({user : null})
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err){
            console.error('Invalid token', err);
            return res.status(403).json({message : 'Invalid token'});
        }
        req.user = user;
        console.log('Validated token user is ', req.user);
        next();
    });
};

app.get('/authenticate', authenticateToken, (req,res)=>{
    if (req.user){
        res.json({user : req.user});
    } else {
        res.status(400).json({message : 'Error'});
    }
    
})


app.post('/update-role', authenticateToken,  async (req,res)=>{
    if (req.body.password === process.env.ADMIN_KEY) {
        const userId = req.body.id;
        const newRole = req.body.newRole;
        await updateRole(userId, newRole);
        const newToken = updateRoleInToken(req.user, newRole );
        res.cookie(
            'JWT', token, {
                httpOnly : true,
                secure : process.env.NODE_ENV === 'production',
                sameSite : 'strict'
            }
        )

        console.log('success');
        res.json({message : 'Updated role successfully'});
    } else {
        console.log('Password from cookies did not match .env key');
        res.status(400).json({message : 'Incorrect password'});
    }
})

const updateRoleInToken = ( user, newRole ) => {
    const payload = { id : user.id, username : user.username, firstName : user.firstName, lastName : user.lastName, role : newRole, email : user.email }
    const newToken = jwt.sign( payload, process.env.JWT_KEY, {expiresIn : '1h'} );
    return newToken;
}


app.post('/generate-presigned-url', async (req,res)=>{
    const fileName = encodeURIComponent(req.body.fileName);
    const key = `blog-images/${fileName}`;
    console.log(' file type : ', req.body.fileType);
    try {
        const command = new PutObjectCommand ({
            Bucket : BUCKET_NAME,
            Key : key,
            ContentType : req.body.fileType
        });
        const uploadURL = await getSignedUrl(s3, command, {expiresIn : 60})
        res.json({
            uploadURL,
            location : `${CLOUDFRONT_URL}/${key}`
        })
    } catch (err) {
        console.error('Error getting url ', err);
        res.status(500).json({ error : 'failed to generate url' });
    }
   
});

app.post('/save-post', async (req,res) =>{
    const userId = req.body.user.id;
    const { content, title, city, country, category } = req.body;
    await addBlogpost( userId, content, title, city, country, category );
    res.json({message: 'success!'});

})

app.get('/unpublished-posts', async(req,res) => {
    const unpublishedPosts = await getUnpublishPosts();
    res.json({unpublishedPosts});
    // await pusblishPost(blogId);
})

app.get('/published-posts', async (req, res) => {
    const publishedPosts = await getPublishPost();
    res.json(publishedPosts);
})

app.put('/publish-post', async (req,res)=>{
    const  id  = parseInt(req.body.postId, 10);
    await publishPost(id);
    res.json({message : 'success!'});
})

app.get('/get-post/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const post = await getSinglePost(id);
    res.json(post);
})

app.post('/comment', async (req,res)=>{
    console.log(req.body);
    const {firstName, lastName, email, comment, picture, blogId, parentId  } = req.body;
    const googleId = req.body.sub;
    const role = 'GUEST';

    
    let userId;

    const userFromQuery = await findUser(email);
    if (!userFromQuery){
        try { 
            const userData = {
                firstName,
                lastName : lastName || null,
                email,
                googleId,
                role,
                picture,
                parentId : Number(parentId) || null
            }

            const addedUser = await addUser( userData);
            userId = addedUser.id;
            console.log ('the user id from the try catch block is ', userId);
        } catch (err) {
            console.log('Problem adding user to db, probably already registered', err);
        }

    } else {
        userId = userFromQuery.id;
        console.log('User ID from else is ', userId);
    }


    console.log('blog ID type is ', typeof(blogId));



    const addedComment = await addComment({
        content : comment, 
        userId,
        blogId : Number(blogId),
        parentCommentId : Number(parentId) || null
    });
    console.log("added comment is ", addedComment);
    res.json({addedComment});
    
})

app.get('/comment/:id', async (req,res)=>{
    const blogId = Number(req.params.id);
    const allComments = await getAllComments(blogId);
    res.json(allComments);
})
    
app.get('/image-proxy', async (req,res)=> {
    const imageURL = req.query.url;
    try {
        const response = await fetch(imageURL);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.set('Content-Type', response.headers.get('Content-Type'));
        res.send(buffer);

    } catch (err) {
        res.status(500).send('Error fetching image');
    }
})


app.listen(3000, ()=> console.log("Express App Listening on Port 3000"));