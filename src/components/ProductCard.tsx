'use client'
import React from 'react';
import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';
import { MapPinIcon , PhoneIcon , StarIcon} from '@heroicons/react/20/solid';


export default function ProductCard({campgroundName,campgroundAddress,campgroundPhone,imgSrc,rating}:{campgroundName:string,campgroundAddress:string,campgroundPhone:string,imgSrc:string,rating:number}){
    function onCarSelected(){
        alert("You Select "+campgroundName);
    }
    
    const [value, setValue] = React.useState<number>(rating);
    return(
        <InteractiveCard contentName={campgroundName}>
            <div className="w-full h-[40%] relative rounded-t-lg">
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className="object-cover rounded-t-lg"
            />
            </div>
            <div className="w-full h-[15%] p-[10px] text-black font-bold"> {campgroundName}</div> 
            <div className="flex text-black"><MapPinIcon className="w-6 h-6 text-red-500" />  {campgroundAddress}</div>
            <div className="flex text-black"><PhoneIcon className="w-6 h-6 text-black" />  {campgroundPhone}</div>
            <div className="flex text-yellow-400"><StarIcon className="w-6 h-6 text-yellow-400" />  {rating}</div>

            {/* <div>
                    {
                        rating?<Rating
                             name={campgroundName + " Rating"}
                             id={campgroundName + " Rating"}
                             readOnly
                             value={value}
                         />:' '
                         
                    }
                </div> */}
        </InteractiveCard>

    )

}