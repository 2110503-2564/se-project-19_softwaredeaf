import getCampground from "@/libs/getCampground"
import Image from "next/image";
import { CampgroundItem, CampgroundJson } from "../../../../../interface"

export default async function campground({params}:{params:{cid:string}}){
    const campgroundJson = await getCampground(params.cid);
    const campground:CampgroundItem = campgroundJson.data;
    // console.log(display);
    return(
        <div 
        className="p-10 w-[80%] h-[70%] bg-white border border-[#A4B465] rounded-[40px] my-40 m-auto shadow-lg">
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
      <p className="text-black bg-white rounded-lg m-1 p-2">Lamp</p>
      <p className="text-black bg-white rounded-lg m-1 p-2">Tent</p>
      <p className="text-black bg-white rounded-lg m-1 p-2">BBQ Grill</p>
      
    </div>
  </div>

  
  <div className="w-[30vw] h-[300px] rounded-xl overflow-hidden shadow">
    <div className="h-[20%] bg-[#626F47] p-3">
      <p className="text-white text-2xl">Reviews</p>
    </div>
    <div className="h-[80%] bg-[#F5F5F5] p-3 overflow-y-auto">
      <p className="text-black bg-white rounded-lg m-1 p-2">Bank<br/>
      "หิวข้าว"  dummy
      </p>
    </div>
  </div>

  
</div>

</div>

            
        </div> 
    )
    
}