'use client'
import BookedAmenityList from "@/components/BookedAmenityList";
import Image from 'next/image';
import deleteBooking from "@/libs/deleteBooking";
import { ReservationItem } from "../../interface";
export default function BookingItem({booking,token}:{booking:ReservationItem,token:string}){
    const handleDelete = async (bid:string) => {
        await deleteBooking(token,bid);
        // optionally trigger a refresh or UI update
      };
    return (
        <div className="flex flex-row p-3 pr-0 w-[80%] h-[300px] bg-white text-black font-bold border border-[#A4B465] rounded-[40px]  mx-auto my-20 shadow-lg">
            <div className="p-3 pl-10 w-[50%] flex-col">
                <div className="w-[100%] flex justify-start gap-5">
                    <div className="w-[60%]">
                        <p className='mt-7 mb-3'>Campground:</p>
                        <div className="bg-[#D9D9D9] px-3 py-1 mt-2 rounded-md text-base font-light w-[74%] flex place-content-evenly">
                            {booking.campground.name}
                        </div>
                    </div>
                    {/* <div className="flex-col-rev"> */}
                        <button 
                            className="mt-5 w-16 h-16 rounded-full bg-[#FFB900] flex items-center justify-center shadow-md hover:brightness-70"
                            
                            >
                            <img src="/img/edit.png" alt="Edit" className="w-6 h-6" />
                        </button>

                        <button 
                            className="mt-5 w-16 h-16 rounded-full bg-[#C46B65] flex items-center justify-center shadow-md hover:brightness-70"
                            onClick={()=>handleDelete(booking._id)}
                            >
                            <img src="/img/delete.png" alt="Delete" className="w-6 h-6" />
                        </button>
                    {/* </div> */}
                </div>
                <div className="w-full mt-10">
                    <p className="mb-5">Date:</p>
                    <div className="flex place-content-stretch">
                        <div className="flex overflow-y-auto mr-5 w-[45%]">
                            <p className="mr-2">From:</p>
                            <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light w-full flex place-content-evenly"> {booking.campingDate}</div>
                        </div>
                        <div className="flex overflow-y-auto w-[45%]">
                            <p className="mr-2">To:</p>
                            <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light w-full flex place-content-evenly"> {booking.campingDate}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-[48%]">
                <BookedAmenityList/>
            </div>
        
        </div>
    )
}