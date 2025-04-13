'use client'
import React from 'react';
import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';

export default function ProductCard({campgroundName,imgSrc,rating}:{campgroundName:string,imgSrc:string,rating:number}){
    function onCarSelected(){
        alert("You Select "+campgroundName);
    }
    
    const [value, setValue] = React.useState<number>(rating);
    return(
        <InteractiveCard contentName={campgroundName}>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className="object-cover rounded-t-lg"
            />
            </div>
            <div className="w-full h-[15%] p-[10px]">{campgroundName}</div>
            <div>
                    {
                        rating?<Rating
                             name={campgroundName + " Rating"}
                             id={campgroundName + " Rating"}
                             readOnly
                             value={value}
                         />:' '
                         
                    }
                </div>
        </InteractiveCard>

    )

}