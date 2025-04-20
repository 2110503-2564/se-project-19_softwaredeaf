import getCampground from "@/libs/getCampground";
import { getAmenities } from "@/libs/getAmenities";
import getOneBooking from "@/libs/getOneBooking";
import { CampgroundItem, AmenityItem , AmenityJson,ReservationItem ,AmenityBookingItemFetch ,AmenityBookingJson} from "../../../../../interface"
import Image from "next/image";
import EditBookingForm from "@/components/EditBookingForm";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import getAmenityBooking from "@/libs/getBookingAmenity";

export default async function editBooking({params}:{params:{bid:string}}){
    const session=await getServerSession(authOptions);
    if(!session || !session.user) return (<div>lol</div>);
    const token=session.user.token;
    
    const bookingJson = await getOneBooking(token,params.bid);
    const booking: ReservationItem = bookingJson.data;
    
    const campgroundJson = await getCampground(booking.camp._id);
    const campground: CampgroundItem = campgroundJson.data;
    console.log(params.bid);

    const amenityJson:AmenityBookingJson = await getAmenityBooking(token,params.bid);
    const amenity: AmenityBookingItemFetch[] = amenityJson.data;
    return (
        <div className="px-20">
            <p className="p-5 text-7xl text-black font-bold">Edit Booking</p>

            <div className="flex content-around gap-20 p-5 h-[30vh] w-full h-full">
                <div className="col-span-1">
                    {/* <div className="row-span-5 text-black bg-red-200"> */}
                        <div className="text-4xl font-bold grid grid-cols-2 w-full">
                            <p className="text-black  min-w-[100px]">Campground: </p>
                            <p className="text-black ">{campground.name}</p>
                        </div>
                        <div className="text-xl font-medium grid my-5 grid-cols-2 w-full">
                            <p className="row-span-1 col-span-1 text-black text-xl  min-w-[100px]">Address: </p>
                            <p className="col-span-1 text-black text-xl ">
                                {campground.address} {campground.district} {campground.province}  {campground.postalcode}
                            </p>
                        </div>
                        <div className="text-xl font-medium grid grid-cols-2 my-5 w-full">
                            <p className="text-black text-xl min-w-[100px]">Tel: </p>
                            <p className="text-black text-xl">{campground.tel}</p>
                        </div>
                        <div className="text-xl font-medium grid grid-cols-2 my-5 w-full">
                            <p className="text-black text-xl min-w-[100px]">Region: </p>
                            <p className="text-black text-xl">{campground.region}</p>
                        </div>
                        <div className="text-xl text-[#FFB900] font-medium grid grid-cols-2 my-5 w-full">
                            <p className=" text-xl min-w-[100px]">Rating: </p>
                            <p className="text-xl">dummy Stars</p>
                        </div>
                </div>
                <div className="text-black bg-green-100 rounded-tl-xl shadow-md rounded-bl-xl flex justify-center">
                    <Image
                        alt="campground"
                        src="/img/campicdemo.jpg"
                        height={300}
                        width={300}
                        className="w-[60vh] h-auto rounded-xl"
                    >
                    </Image>
                </div>
                
            </div> 
            <div className="mt-5">
                <EditBookingForm amenities={amenity} bookingId={params.bid} booking={booking}/>
            </div>
            
        </div>
        
    )
}