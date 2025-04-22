'use client'
import BookedAmenityList from "@/components/BookedAmenityList";
import dayjs from "dayjs";
import deleteBooking from "@/libs/deleteBooking";
import deleteAmenityBookingByBookingId from "@/libs/deleteAmenityBookingByBookingId";
import { ReservationItem } from "../../interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingItem({booking,token}:{booking:ReservationItem,token:string}){

    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (bid: string) => {
    setIsDeleting(true);
    try {
        await deleteAmenityBookingByBookingId(token, bid);
        await deleteBooking(token, bid);
    } catch (error) {
        console.log(error);
        alert("Delete failed");
    } finally {
        alert("Delete Booking Success!");
        router.push("/mybooking");
        setIsDeleting(false);
    }
    };
    return (
        <div className="flex flex-row p-3 pr-0 w-[80%] h-[300px] bg-white text-black font-bold border border-[#A4B465] rounded-[40px]  mx-auto my-20 shadow-lg">
            <div className="p-3 pl-10 w-[50%] flex-col">
                <div className="w-[100%] flex justify-start gap-5">
                    <div className="w-[60%]">
                        <p className='mt-7 mb-3'>Campground:</p>
                        <div className="bg-[#D9D9D9] px-3 py-1 mt-2 rounded-md text-base font-light w-[74%] flex place-content-evenly">
                            {booking.camp.name}
                        </div>
                    </div>
                    {/* <div className="flex-col-rev"> */}
                    <Link href={`/mybooking/${booking._id}/edit`}>
                        <button 
                            className="mt-5 w-16 h-16 rounded-full bg-[#FFB900] flex items-center justify-center shadow-md hover:brightness-70"
                            >
                            <img src="/img/edit.png" alt="Edit" className="w-6 h-6" />
                        </button>
                    </Link>
                        <button 
                            className="mt-5 w-16 h-16 rounded-full bg-[#C46B65] flex items-center justify-center shadow-md hover:brightness-70"
                            disabled={isDeleting} onClick={()=>handleDelete(booking._id)}
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
                            <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light w-full flex place-content-evenly"> { dayjs(booking.startDate).format('DD/MM/YYYY').toString()}</div>
                        </div>
                        <div className="flex overflow-y-auto w-[45%]">
                            <p className="mr-2">To:</p>
                            <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light w-full flex place-content-evenly"> {dayjs(booking.endDate).format('DD/MM/YYYY').toString()}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-[48%]">
                <BookedAmenityList token={token} bid={booking._id}/>
            </div>
        
        </div>
    )
}