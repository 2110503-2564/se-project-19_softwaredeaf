'use client'
import BookedAmenityList from "@/components/BookedAmenityList";
import Image from 'next/image';
import { ReservationItem } from "../../interface";
export default function BookingItem({booking}:{booking:ReservationItem}){
    return (
        <div className="flex flex-row p-10 w-[80%] h-[400px] bg-white text-black font-bold border border-[#A4B465] rounded-[40px]  mx-auto my-20 shadow-lg">
            <div className="w-[60%]">
                
                    <p className="mb-[10%]">Date:</p>
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
                
                
                    <p className='mb-10'>Campground:</p>
                    <div className='flex flex-row'>    
                        <div className="bg-[#D9D9D9] px-3 py-1 mt-2 rounded-md text-base font-light w-[45%] flex place-content-evenly">{booking.campground.name}</div>
                        {/* button */}
                        <div className="relative bg-[#FFB900] w-[10%] rounded-full ml-[23%]">
                            <button>
                            <Image
                            src="/img/edit.png"
                            alt="edit booking"
                            fill
                            className="object-contain"
                            />
                            </button>
                        </div>
                        <div className="relative bg-[#C46B65] w-[10%] rounded-full ml-7">
                            <button>
                            <Image
                            src="/img/delete.png"
                            alt="delete booking"
                            fill
                            className="object-contain"
                            />
                            </button>
                        </div>
                    </div>
                
                
            </div>
            <div className="w-[40%] overflow-auto">
                <BookedAmenityList/>
            </div>
        
        </div>
    )
}