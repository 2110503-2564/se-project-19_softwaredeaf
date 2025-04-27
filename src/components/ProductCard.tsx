'use client'
import React from 'react';
import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';
import { MapPinIcon , PhoneIcon , StarIcon} from '@heroicons/react/20/solid';
import { CampgroundItem } from '../../interface';


export default function ProductCard({campground}:{campground:CampgroundItem}){
    function onCarSelected(){
        alert("You Select "+campground.name);
    }
    
    const [value, setValue] = React.useState<number>(campground.avgRating);
    let rating="0";
    if(campground.reviewCount==0) {
        rating="-";
    }
    else rating=campground.avgRating.toString();
    return(
        <InteractiveCard contentName={campground.name}>
            <div className="w-full h-[40%] relative rounded-t-lg">
                <Image src={campground.picture}
                alt='Product Picture'
                fill={true}
                className="object-cover rounded-t-lg"
            />
            </div>
            <div className='ml-[10px]'>
            <div className="w-full h-[15%] pl-2 py-[10px] pb-5 text-black font-bold"> {campground.name}</div> 
            <div className="flex text-black mb-3"><MapPinIcon className="w-6 h-6 text-red-500 mr-3" />  {campground.address}</div>
            <div className="flex text-black mb-3"><PhoneIcon className="w-6 h-6 text-black mr-3" />  {campground.tel}</div>
            <div className="flex text-yellow-400"><StarIcon className="w-6 h-6 text-yellow-400 mr-3" />{rating}</div>
            </div>
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