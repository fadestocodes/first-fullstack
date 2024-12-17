import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {prisma} from "@/prisma/prisma";
// import {PrismaAdapter} from '@next-auth/prisma-adapter'


export const authOptions = {
    // adapter : PrismaAdapter(prisma),

    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
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
      ],
      
      callbacks : {
        async signIn({user, account, profile}){
            // console.log('Profile received', profile);
    
            try {
                console.log('Searching prisam for unique user');
                const user = await prisma.user.findUnique({
                    where : {
                        email : profile?.email
                    },
                })
                if (!user) {
                    console.log('no user found, trying to add new user to db');
                    await prisma.user.create({
                        data : {
                            firstName : profile?.given_name,
                            lastName : profile?.family_name,
                            email : profile?.email,
                            googleId : profile?.sub,
                            picture : profile?.picture
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
    
        async session ({session, user ,token}){
            // if (token?.id) {
            //     session.id = token.id;
            //     session.user = user
            //     console.log('token id is: ', token?.id);
            // }
            const userWithRole = await prisma.user.findUnique({
                where : {
                    email : session.user.email
                },
                select : {
                    firstName : true,
                    lastName : true,
                    id : true,
                    role : true
                }
            });
            
            session.user.role = userWithRole?.role;
            session.user.id = userWithRole?.id;
            session.user.firstName = userWithRole?.firstName;
            session.user.lastName = userWithRole?.lastName;
            session.user.refreshToken = token.refreshToken;

            return session;
        },
     
        
    },

}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }