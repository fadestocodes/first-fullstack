import NextAuth from "next-auth"
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import {prisma} from "@/prisma/prisma";
// import {PrismaAdapter} from '@next-auth/prisma-adapter'


export const authOptions = {
    // adapter : PrismaAdapter(prisma),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization : {
                params: {
                    access_type: "offline",
                    response_type: "code"
                  }
            }
          }),
        FacebookProvider({
            clientId:process.env.FB_APP_ID,
            clientSecret:process.env.FB_APP_SECRET
        })
      ],

    pages:{
        signIn : `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        error: '/auth/error'
    },
      
    callbacks : {
        async signIn({user, account, profile}){
            console.log('Profile received', profile);
            console.log("Account:", account);
            console.log("Profile:", profile);
            console.log("User:", user);
            if (!profile || !account) {
              console.error("Missing profile or account data");
              return false;
            }
            
            try {
                const isGoogle = account.provider==='google';
                const isFb = account.provider === 'facebook';

                console.log('Searching prisam for unique user');
                const existingUser = await prisma.user.findUnique({
                    where : {
                        email : profile.email
                    },
                })
                console.log('found user?');
                if (!existingUser) {
                    console.log('no user found, trying to add new user to db');
                    await prisma.user.create({
                        data : {
                            name : profile?.name ,
                            email : profile.email,
                            googleId : isGoogle ? profile?.sub : null,
                            facebookId : isFb ? profile.id : null,
                            picture : isGoogle ? profile?.picture : profile.picture?.data?.url || null
                        }
                    })
                }
                return true
            } catch (err) {
                console.error('Error from database', err);
                return false;
            }
        },

        async jwt ({token ,account}) {
            if (account){
                token.refreshToken = account.refresh_token;
            }
            return token;
        },

        async session ({session ,token}){
            // if (token?.id) {
            //     session.id = token.id;
            //     session.user = user
            //     console.log('token id is: ', token?.id);
            // }
            // const userWithRole = await prisma.user.findUnique({
            //     where : {
            //         email : session.user.email
            //     },
            //     select : {
            //         name : true,
            //         id : true,
            //         role : true
            //     }
            // });
            
            // session.user.role = userWithRole?.role;
            // session.user.id = userWithRole?.id;
            // session.user.name = userWithRole?.name;
            // session.user.refreshToken = token.refreshToken;
            if (session.user) {  // Ensure session.user exists
                console.log("Session User:", session.user);
            
                // Adding logging for email
                if (!session.user.email) {
                  console.error("No email found in session.user!");
                }
            
                const userWithRole = await prisma.user.findUnique({
                  where: { email: session.user.email },
                  select: {
                    id: true,
                    name: true,  // Make sure 'name' field exists in schema
                    role: true,
                    picture: true
                  }
                });
            
                if (!userWithRole) {
                  console.error("User with email not found:", session.user.email);
                } else {
                  console.log("User found with role:", userWithRole);
                  session.user.role = userWithRole.role;
                  session.user.id = userWithRole.id;
                  session.user.name = userWithRole.name;
                  session.user.picture = userWithRole.picture;
                  session.user.refreshToken = token.refreshToken;
                }
              }
            
              return session;
    },
}
        

}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }