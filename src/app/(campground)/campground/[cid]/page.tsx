import getCampground from "@/libs/getCampground";
import { getAmenities } from "@/libs/getAmenities";
import Image from "next/image";
import { CampgroundItem, AmenityJson, AmenityItem } from "../../../../../interface"
import Link from "next/link";

export default async function campground({ params }: { params: { cid: string } }) {
  const campgroundJson = await getCampground(params.cid);
  const campground: CampgroundItem = campgroundJson.data;

  const amenityJson:AmenityJson = await getAmenities(params.cid);
  const amenity: AmenityItem[] = amenityJson.data;
  

  // const amenityJson= await getAmenities(campground._id);
  // const amenity:AmenityItem[]=amenityJson.data;

  //mock amenity for campground id 68033e03f4a12360e7f5c204
  // const amenity: AmenityItem[] = [
  //   {
  //     "_id": "68033e03f4a12360e7f5c204",
  //     "campgroundId": "68025bb266414902e377d383",
  //     "amenityTypeId": {
  //       "_id": "68033dd6f4a12360e7f5c1fe",
  //       "name": "Fire Pit",
  //       "description": "A cozy fire pit perfect for evening gatherings."
  //     },
  //     "status": "available",
  //     "price": 15,
  //     "quantity": 3
  //   },
  //   {
  //     "_id": "68033e03f4a12360e7f5c204",
  //     "campgroundId": "68025bb266414902e377d383",
  //     "amenityTypeId": {
  //       "_id": "68033dd6f4a12360e7f5c1fe",
  //       "name": "BBQ grill",
  //       "description": "eat bbq lol"
  //     },
  //     "status": "booked",
  //     "price": 5000,
  //     "quantity": 3
  //   },
  //   {
  //     "_id": "68033e03f4a12360e7f5c204",
  //     "campgroundId": "68025bb266414902e377d383",
  //     "amenityTypeId": {
  //       "_id": "68033dd6f4a12360e7f5c1fe",
  //       "name": "BBQ grill",
  //       "description": "eat bbq lol"
  //     },
  //     "status": "booked",
  //     "price": 5000,
  //     "quantity": 3
  //   },
  //   {
  //     "_id": "68033e03f4a12360e7f5c204",
  //     "campgroundId": "68025bb266414902e377d383",
  //     "amenityTypeId": {
  //       "_id": "68033dd6f4a12360e7f5c1fe",
  //       "name": "BBQ grill",
  //       "description": "eat bbq lol"
  //     },
  //     "status": "booked",
  //     "price": 5000,
  //     "quantity": 3
  //   }
  // ];
  //mock review
  const review=[
    {
      "user":"user1",
      "rating":5,
      "comment":"sleepy",
    },
    {
      "user":"user2",
      "rating":2,
      "comment":"sleepy",
    }
  ];

  return (
    <div className="p-10 w-[80%] h-[70%] bg-white border border-[#A4B465] rounded-[40px] my-40 m-auto shadow-lg">
      <div className="pl-3 flex justify-between w-full">
        <div className="text-black text-3xl font-semibold mt-10">
          Name: {campground.name}
          <p className="text-2xl font-normal">description description blah blah</p>
        </div>
        <div className="relative w-[170px] h-[170px] border rounded-xl">
          <Image
            src="/img/logo.png"
            alt="logo"
            fill
          />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden">
        <div className="flex justify-around gap-4 w-full">
          {/* กล่องที่ 1 */}
          <div className="w-[30vw] h-[300px] rounded-xl overflow-hidden shadow">
            <div className="h-[20%] bg-[#626F47] p-3">
              <p className="text-white text-2xl">Amenities</p>
            </div>
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
          </div>

          <div className="w-[30vw] h-[300px] rounded-xl overflow-hidden shadow">
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
        <div className="relative flex flex-row-reverse">
        <Link href={`/campground/${params.cid}/booking`}>
        <button name="Book Campground" className='w-[150px] bg-[#A4B465] text-black font-semibold py-2 px-2 m-2
                rounded-xl hover:bg-[#626F47] hover:text-white hover:border-transparent bottom-3 ' >Book</button>
        </Link>
        </div>
      </div>
    </div>
  )
}
