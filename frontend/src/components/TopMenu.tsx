"use client";  // ⬅️ Make this a client component
import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { useSession } from "next-auth/react"; // ⬅️ Use client-side session
import DropdownMenu from './DropdownMenu';

export default function TopMenu() {
    const { data: session } = useSession(); // ⬅️ Now updates automatically

    return (
        <div className={styles.menucontainer}>
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo'
                width={0} height={0} sizes='100vh' />
            <TopMenuItem title='Home' pageRef='/' />
            <TopMenuItem title='About' pageRef='/about' />
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
            </div>
        </div>
    );
}
