import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import prisma from './prisma/prisma.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { addUser } from './prisma/prismaQueries.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import {Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import cookieParser from 'cookie-parser';


import { updateRole } from './prisma/prismaQueries.js';


dotenv.config();
const app = express();



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
    res.locals.user = req.user;
    next();
});


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
    try {
        await addUser(firstName,lastName,username,email,hashedPassword);
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

        console.log('Token from backend: ', token);
        res.cookie('token', token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : 'Strict',
            maxAge : 1000*60*60
        });

        res.json({message : 'Login successful', user});
    })(req,res,next);
    
})


app.post('/logout', (req,res)=>{
    res.clearCookie('token', {
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
    
    
    const token =  req.cookies ? req.cookies.token : null ;
    if (!token) {
        return res.status(200).json({user : null})
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err){
            return res.status(403).json({message : 'Invalid token'});
        }
        req.user = user;
        next();
    });
};

app.get('/authenticate', authenticateToken, (req,res)=>{
    console.log()
    if (req.user){
        console.log('req user is : ', req.user)
        res.json({user : req.user});
    } else {
        res.status(400).json({message : 'Error'});
    }
    
})


app.post('/update-role', async (req,res)=>{


    await updateRole(userId, newRole);
    res.json({message : 'Updated role successfully'});
})



app.listen(3000, ()=> console.log("Express App Listening on Port 3000"));