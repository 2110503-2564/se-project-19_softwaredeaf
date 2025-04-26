import BookedAmenity from "@/components/BookedAmenity";
import { AmenityBookingItemFetch , AmenityBookingJson} from "../../interface";
import getAmenityBooking from "@/libs/getBookingAmenity";
import { useEffect, useState } from 'react';

export default function BookedAmenityList({token,bid,rt}:{token:string,bid:string,rt?:boolean}){
    const [data, setData] = useState<AmenityBookingItemFetch[]>([]);

    useEffect(() => {
        async function loadData() {
        const amenityJson:AmenityBookingJson = await getAmenityBooking(token,bid);
        const amenity:AmenityBookingItemFetch[] = amenityJson.data;
        setData(amenity);
        }

        loadData();
    }, []);

    return(
        <div className={`text-black text-xl bg-[#D9D9D9] h-full ${rt ? 'rounded-tr-[40px]' : 'rounded-r-[40px]'}`}>
            <BookedAmenity amenityList={data}/>
        </div>
    )
}