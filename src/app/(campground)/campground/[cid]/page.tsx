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
            <div className="flex start p-10">
                <div className="bg-[#F5F5F5] w-[40%] rounded-xl">
                    <div className="w-full p-3 bg-[#626F47]">
                        <p className="text-white text-2xl">Amenities</p>
                    </div>
                    
                </div>

            </div>

            
        </div> 
    )
    
}