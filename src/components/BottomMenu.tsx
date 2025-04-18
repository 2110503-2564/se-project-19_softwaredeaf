"use client";  // ⬅️ Make this a client component
import styles from './bottommenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { useSession } from "next-auth/react"; // ⬅️ Use client-side session
import DropdownMenu from './DropdownMenu';

export default function BottomMenu() {
    const { data: session } = useSession();

    return (
        <div className="bg-[#A4B465] w-[100%]">
            <div style={{ position: 'relative', width: '100px', height: '100px', marginLeft: 'auto' }}>
                <Image
                    src="/img/logo.png"
                    alt="logo"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
}

