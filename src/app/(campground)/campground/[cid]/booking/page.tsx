import getCampground from "@/libs/getCampground";
import { getAmenities } from "@/libs/getAmenities";
import { CampgroundItem, CampgroundJson, AmenityItem } from "../../../../../../interface"
import Image from "next/image";
import { Dayjs } from 'dayjs';
import getCampgrounds from '@/libs/getCampgrounds';
import { useSearchParams } from 'next/navigation';
import BookingForm from "@/components/BookingForm";

export default async function booking({params}:{params:{cid:string}}){
    const campgroundJson = await getCampground(params.cid);
    const campground: CampgroundItem = campgroundJson.data;
    
    console.log(params.cid);
    //mock amenity for campground id 68033e03f4a12360e7f5c204
  const amenity: AmenityItem[] = [
    {
      "_id": "68033e03f4a12360e7f5c204",
      "campgroundId": "68025bb266414902e377d383",
      "amenityTypeId": {
        "_id": "68033dd6f4a12360e7f5c1fe",
        "name": "Fire Pit",
        "description": "A cozy fire pit perfect for evening gatherings."
      },
      "status": "available",
      "price": 15,
      "quantity": 3
    },
    {
      "_id": "68033e03f4a12360e7f5c204",
      "campgroundId": "68025bb266414902e377d383",
      "amenityTypeId": {
        "_id": "68033dd6f4a12360e7f5c1fe",
        "name": "BBQ grill",
        "description": "eat bbq lol"
      },
      "status": "booked",
      "price": 5000,
      "quantity": 3
    },
    {
      "_id": "68033e03f4a12360e7f5c204",
      "campgroundId": "68025bb266414902e377d383",
      "amenityTypeId": {
        "_id": "68033dd6f4a12360e7f5c1fe",
        "name": "BBQ grill",
        "description": "eat bbq lol"
      },
      "status": "booked",
      "price": 5000,
      "quantity": 3
    },
    {
      "_id": "68033e03f4a12360e7f5c204",
      "campgroundId": "68025bb266414902e377d383",
      "amenityTypeId": {
        "_id": "68033dd6f4a12360e7f5c1fe",
        "name": "BBQ grill",
        "description": "eat bbq lol"
      },
      "status": "booked",
      "price": 5000,
      "quantity": 3
    }
  ];

    return (
        <div className="ml-20">
            <p className="p-5 text-7xl text-black font-bold">Create New Booking</p>

            <div className="grid grid-cols-3 grid-rows-5 bg-white border border-[#626F47] p-5 rounded-xl shadow-xl h-[30vh] w-[70vw]">
                <div className="col-span-1 row-span-full text-black bg-green-100">
                    <Image
                        alt="campground"
                        src="/img/logo.png"
                        height={300}
                        width={300}
                        className="h-full w-auto"
                    >
                    </Image>
                </div>
                <div className="flex flex-col column-auto row-span-full col-span-2 bg-red-100">
                    {/* <div className="row-span-5 text-black bg-red-200"> */}
                        <div className="flex flex-row row-span-1 col-span-2 bg-red-200">
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
                <BookingForm amenities={amenity}/>
            </div>
            
        </div>
        
    )
}