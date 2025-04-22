"use client";  
import Image from 'next/image';
import { EnvelopeIcon ,PhoneIcon} from '@heroicons/react/20/solid';

export default function BottomMenu() {

    return (
        <div className="bg-[#A4B465] w-full">
            <div className="flex justify-between items-center">
                <div className="ml-4">
                    <div className="font-bold text-black">Contact Us</div>
                    <div className="flex flex-row text-black">
                        <EnvelopeIcon className="w-6 h-6 pr-[5px]"/> email@email.com
                    </div>
                    <div className="flex flex-row text-black">
                        <PhoneIcon className="w-6 h-6 pr-[5px]"/>098-765-4321
                    </div>
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

