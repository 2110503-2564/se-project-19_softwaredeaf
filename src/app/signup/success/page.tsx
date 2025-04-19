'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInSuccess(){
    

    const router = useRouter()
    useEffect(() => {
        
          const timer = setTimeout(() => {
            router.push("/api/auth/signin");
          }, 1500);
    
          return () => clearTimeout(timer);
        
      }, [router]);

      

      return (
        <div className='flex flex-col h-screen w-full justify-center items-center bg-white'>
            <h1 className='font-bold text-3xl text-black'>Register Success!!</h1>
            <h3 className="text-black">Redirecting you to Login Page</h3>
        </div>

      );
    
}