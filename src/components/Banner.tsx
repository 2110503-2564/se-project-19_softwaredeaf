'use client';
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner (){ 
    const covers =['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg']
    const [index,setState] = useState(0);
    const router = useRouter();
    const {data:session} = useSession()
    console.log(session?.user.token)

    return (
        <div className={styles.banner} onClick={()=>{setState(index+1)}}>
            <Image src={covers[index%1]} alt='cover'
            fill={true}
            objectFit='cover'/>
            <div className={styles.bannerText}>
                <h1 className = "font-bold text-7xl flex flex-left drop-shadow-md text-blue-100">Sev Wae Dof</h1>
                <h3 className = "fond-bold text-2xl flex flex-left drop-shadow-md text-blue-100">Find Your Perfect Spot Under the Stars</h3>
            </div>

            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>Hello {session.user?.role}</div>
                    :null
            }

            <button className='bg-white text-cyan-600 border border-cyan-600 
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
            hover:bg-cyan-600 hover:text-white hover:border-transparent'
            onClick={(e)=>{router.push('/campground');e.stopPropagation()}}>
                Select Your Campground Now
            </button>
        </div>
    );
}