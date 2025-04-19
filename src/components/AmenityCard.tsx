'use client'
import React from 'react';
import InteractiveCard from './InteractiveCard';
import { MapPinIcon , PhoneIcon , StarIcon} from '@heroicons/react/20/solid';


export default function AmenityCard({amenityName,amount}:{amenityName:string,amount:number}){

    return(
        <div>
            <div className="w-full h-[15%] p-[10px] text-black font-bold"> {amenityName}</div> 
            <div className="w-full h-[15%] p-[10px] text-black font-bold"> {amount}</div> 
        </div>

    )

}