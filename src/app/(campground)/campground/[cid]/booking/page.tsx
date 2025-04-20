'use server'
import getCampground from "@/libs/getCampground";
import { getAmenities } from "@/libs/getAmenities";
import createBooking from "@/libs/createBooking";
import { CampgroundItem, AmenityItem , AmenityJson} from "../../../../../../interface"
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function booking({params}:{params:{cid:string}}){
    const session=await getServerSession(authOptions);
    if(!session || !session.user) return (<div>User not logged in</div>);
    const token=session.user.token;
    const campgroundJson = await getCampground(params.cid);
    const campground: CampgroundItem = campgroundJson.data;

    const amenityJson:AmenityJson = await getAmenities(params.cid);
    const amenity: AmenityItem[] = amenityJson.data;
    console.log(params.cid);
    return (
        <div className="px-20">
            <p className="p-5 text-4xl text-black font-bold">Create New Booking</p>

            <div className="grid grid-cols-3 grid-rows-5 bg-white border border-[#626F47] p-5 rounded-xl shadow-xl h-[30vh] w-full">
                <div className="col-span-1 row-span-full text-black rounded-tl-xl rounded-bl-xl flex justify-center">
                    <Image
                        alt="campground"
                        src="/img/campicdemo.jpg"
                        height={300}
                        width={300}
                        className="h-full w-auto h-auto rounded-xl"
                    >
                    </Image>
                </div>
                <div className="flex flex-col column-auto row-span-full col-span-2 rounded-tr-xl rounded-br-xl">
                    {/* <div className="row-span-5 text-black bg-red-200"> */}
                        <div className="flex flex-row row-span-1 col-span-2 rounded-tr-xl">
                            <p className="text-black text-xl font-semibold min-w-[100px]">Name: </p>
                            <p className="text-black text-xl font-semibold">{campground.name}</p>
                        </div>
                        <div className="flex flex-row row-span-2 col-span-2">
                            <p className="row-span-1 col-span-1 text-black text-xl font-semibold min-w-[100px]">Address: </p>
                            <p className="col-span-1 text-black text-xl font-semibold">
                                {campground.address} {campground.district} {campground.province}  {campground.postalcode}
                            </p>
                        </div>
                        <div className="flex flex-row row-span-1 col-span-2">
                            <p className="text-black text-xl font-semibold min-w-[100px]">Tel: </p>
                            <p className="text-black text-xl font-semibold">{campground.tel}</p>
                        </div>
                        <div className="flex flex-row row-span-1 col-span-2">
                            <p className="text-black text-xl font-semibold min-w-[100px]">Region: </p>
                            <p className="text-black text-xl font-semibold">{campground.region}</p>
                        </div>
                        <div className="flex flex-row row-span-1 col-span-2 text-[#FFB900]">
                            <p className=" text-xl font-semibold min-w-[100px]">Rating: </p>
                            <p className="text-xl font-semibold">dummy Stars</p>
                        </div>

                    {/* </div> */}
                </div>
                
            </div> 
            <div className="mt-5">
                <BookingForm amenities={amenity} campsId={campground._id}/>
            </div>
            
        </div>
        
    )
}