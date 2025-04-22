import userLogin from "@/libs/userLogin";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions:AuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              
                if(!credentials) return null
                const user = await userLogin(credentials.email,credentials.password)

        
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          })
    ],
    pages: {
      signIn: "/api/auth/signin", // ใช้ Custom Page
      error: "/api/auth/signin", // ถ้ามี Error ให้กลับมาที่เดิม
    },
    session: {strategy:"jwt"},
    callbacks: {
        async jwt({token,user}){
            return {...token, ...user}
        },

        async session({session, token, user}){
            session.user = token as any
            return session
        }   
    }
}