"use client";  // ⬅️ Make this a client component
import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { useSession } from "next-auth/react"; 
import DropdownMenu from './DropdownMenu';

export default function TopMenu() {
    const { data: session } = useSession(); 

    return (
        <div className={styles.menucontainer}>
            <TopMenuItem title='Home' pageRef='/' />

            <div className='flex flex-row absolute right-0 h-full'>
                <TopMenuItem title={session?'Sign-out':'Sign-in'} pageRef={session?'/api/auth/signout':'/api/auth/signin'} />

                <TopMenuItem title='Booking' pageRef='/booking' />
            </div>
            {/* <TopMenuItem title='About' pageRef='/about' />
            <TopMenuItem title='Campgrounds' pageRef='/campground' />
            <TopMenuItem title={session?.user.role==='admin' ? 'View All Bookings' : 'Your Bookings'} pageRef='/cart' />

            <div className='flex flex-row absolute right-0 h-full'>
                <TopMenuItem title='Book Now' pageRef='/reservations' />

                {session ? (
                    <DropdownMenu session={session} />
                ) : (
                    <Link href="/api/auth/signin">
                        <div className="flex items-center h-full px-2 text-white text-sm cursor-pointer">Sign-In</div>
                    </Link>
                )}
            </div> */}
        </div>
    );
}
