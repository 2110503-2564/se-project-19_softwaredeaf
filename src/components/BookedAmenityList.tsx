import BookedAmenity from "@/components/BookedAmenity";
import { AmenityItem , AmenityBookingItemFetch , AmenityBookingJson} from "../../interface";
import getAmenityBooking from "@/libs/getBookingAmenity";

export default async function BookedAmenityList({token,bid}:{token:string,bid:string}){
    const amenityJson:AmenityBookingJson = await getAmenityBooking(token,bid);
    const amenity:AmenityBookingItemFetch[] = amenityJson.data;
    return(
        <div className="text-black text-xl bg-[#D9D9D9] h-full">
            <BookedAmenity amenityList={amenity}/>
        </div>
    )
}