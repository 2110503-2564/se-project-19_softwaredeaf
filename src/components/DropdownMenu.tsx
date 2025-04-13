'use client'
import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid"; 

export default function DropdownMenu({ session }: { session: any }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div className="relative">
            <div
                onClick={toggleMenu}
                className="flex items-center h-full px-2 text-white text-sm cursor-pointer"
            >
                {session?.user?.name}
                {/* เพิ่ม icon สามเหลี่ยมที่ชี้ลง */}
                <ChevronDownIcon className="w-4 h-4 ml-1" />
            </div>

            {menuOpen && (
                <div className="absolute bg-gray-800 text-white w-40 mt-1 rounded-md shadow-lg z-10">
                    <Link href="/profile" passHref>
                        <div className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer">Profile</div>
                    </Link>
                    <Link href="/api/auth/signout" passHref>
                        <div className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer">Sign-Out</div>
                    </Link>
                </div>
            )}
        </div>
    );
}
