import userLogin from "@/libs/userLogin";
import NextAuth from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import CredentialsProvider from "next-auth/providers/credentials";



const handler = NextAuth(authOptions)
export {handler as GET,handler as POST}