import getCampground from "@/libs/getCampground";
import { getAmenities } from "@/libs/getAmenities";
import Image from "next/image";
import { CampgroundItem, AmenityJson, AmenityItem } from "../../../../../interface"
import Link from "next/link";
import Booknowbutton from "@/components/Booknowbutton";

export default async function campground({ params }: { params: { cid: string } }) {
  const campgroundJson = await getCampground(params.cid);
  const campground: CampgroundItem = campgroundJson.data;

  const amenityJson:AmenityJson = await getAmenities(params.cid);
  const amenity: AmenityItem[] = amenityJson.data;

  return (
    <div className="px-20">
      <p className="py-5 text-5xl text-black font-bold">{campground.name}</p>
      <div className="grid grid-cols-3 grid-rows-5 bg-white border border-[#626F47] p-5 rounded-xl shadow-xl w-full h-auto">
        <div className="col-span-1 row-span-full text-black bg-green-100 rounded-tl-xl rounded-bl-xl flex justify-center">
          <Image
            alt="campground"
            src="/img/campicdemo.jpg"
            height={300}
            width={300}
            className="w-[40%] h-auto w-auto rounded-xl"
            >
          </Image>
        </div>
          <div className="flex flex-col space-y-2 column-auto row-span-full col-span-2 bg-red-100 rounded-tr-xl rounded-br-xl pl-10">
            {/* <div className="row-span-5 text-black bg-red-200"> */}
            <div className="flex flex-row row-span-1 col-span-2 bg-red-200 rounded-tr-xl">
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
          </div>
      </div>
      <div className="my-10">
        <Booknowbutton linktext={params.cid}/>
      </div>
            <p className="text-4xl text-black font-bold py-5">Amenity</p>
            <div className="h-[80%] bg-[#F5F5F5] p-3 overflow-y-auto">
              {
                amenity.length > 0 ?
                  (amenity.map((amenity: AmenityItem) =>
                    (
                      <div className="p-[2px]">
                        <div className="relative flex flex-row bg-white rounded-lg m-1 p-2">
                          <p className="text-black">{amenity.name}</p>
                          {
                            amenity.status === "available" ?
                              <p className="text-[#A4B465] absolute right-3">Available</p>
                              : <p className="text-[#C46B65] absolute right-3">Booked</p>
                          }
                        </div>
                      </div>
                    ))
                  )
                  : <p className="text-black text-xl">No amenity Available D: </p>
              }
            </div>

          <div className="w-[30vw] h-[300px] rounded-xl overflow-hidden shadow mt-10">
            <div className="h-[20%] bg-[#626F47] p-3">
              <p className="text-white text-2xl">Reviews</p>
            </div>
            <div className="h-[80%] bg-[#F5F5F5] p-3 overflow-y-auto">
              <p className="text-black bg-white rounded-lg m-1 p-2">Bank<br />
                บรรยากาศสวยมาก อากาศดี 
              </p>
            </div>
            
          </div>

        
      </div>
  )
}
