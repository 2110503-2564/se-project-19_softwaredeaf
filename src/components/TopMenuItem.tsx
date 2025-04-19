import Link from "next/link";
import styles from './topmenu.module.css'
import React from "react";
export default function TopMenuItem ({title,pageRef} : {title:string,pageRef:string}) {
    return (
        <Link href={pageRef} className="flex text-md py-3 font-bold text-black hover:bg-[#626F47] hover:text-white px-5 justify-around place-content-center">
            {title}
        </Link>
    );
}