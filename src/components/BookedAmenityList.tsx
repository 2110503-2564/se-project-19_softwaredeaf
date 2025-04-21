import BookedAmenity from "@/components/BookedAmenity";
import { AmenityItem , AmenityBookingItemFetch , AmenityBookingJson} from "../../interface";
import getAmenityBooking from "@/libs/getBookingAmenity";
import { useEffect, useState } from 'react';

export default function BookedAmenityList({token,bid}:{token:string,bid:string}){
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
        <div className="text-black text-xl bg-[#D9D9D9] h-full">
            <BookedAmenity amenityList={data}/>
        </div>
    )
}