"use client";  
import styles from './bottommenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { useSession } from "next-auth/react"; 
import DropdownMenu from './DropdownMenu';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

export default function BottomMenu() {
    const { data: session } = useSession();

    return (
        <div className="z-100 bg-[#A4B465] w-full">
            <div className="flex justify-between items-center">
                <div className="ml-4">
                    <div className="font-bold text-black">Contact Us</div>
                    <div className="flex flex-row text-black">
                        <EnvelopeIcon className="w-6 h-6 pr-[5px]"/> email@email.com
                    </div>
                    continue soon
                    <p className="text-black">098-765-4321</p>
                </div>
                
                <div className="relative w-[6vw] h-[6vw] mr-4">
                    <Image
                        src="/img/logo.png"
                        alt="logo"
                        fill
                        className="object-contain hover:scale-110 transition duration-300 ease-in-out"
                    />
                </div>
            </div>
        </div>
    );
}

