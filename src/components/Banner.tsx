'use client';
import styles from './banner.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react';

export default function Banner (){ 
    const {data:session} = useSession()
    console.log(session?.user.token)

    return (
        <div className={styles.banner}>
            <Image src='/img/banner.png' alt='cover'
            fill={true}
            objectFit='cover' className="opacity-70"/>
            <div className={styles.bannerText}>
                <div className="w-[10vw] h-auto relative aspect-square">
                    <Image
                        src="/img/logo.png"
                        alt="logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="font-bold sm:text-2xl md:text-3xl lg:text-4xl flex flex-left drop-shadow-md text-black mt-5">
                Find Your Perfect Spot Under the Stars
                </h1>
            </div>

            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-[#626F47] text-xl'>Hello {session.user?.role}</div>
                    :null
            }

            {/* <button className='bg-white text-cyan-600 border border-cyan-600 
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
            hover:bg-cyan-600 hover:text-white hover:border-transparent'
            onClick={(e)=>{router.push('/campground');e.stopPropagation()}}>
                Select Your Campground Now
            </button> */}
        </div>
    );
}