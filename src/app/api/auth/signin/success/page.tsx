'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInSuccess(){
    const {data:session,status} = useSession()

    const router = useRouter()
    useEffect(() => {
        if (status === "authenticated") { 
          const timer = setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1500);
    
          return () => clearTimeout(timer);
        }
      }, [status, router]);

      if (status === "loading") {
        return <h1 className="text-center">Loading session...</h1>;
      }

      return (
        <div className='flex flex-col h-screen w-full justify-center items-center bg-white'>
            <h1 className='font-bold text-3xl text-black'>Welcome {session?.user.name} </h1>
            <h3 className="text-black">Redirecting you to Home Page</h3>
        </div>

      );
    
}