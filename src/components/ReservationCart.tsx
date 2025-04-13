'use client'
import deleteBooking from "@/libs/deleteBooking"
import { useSession } from "next-auth/react"
import getBooking from "@/libs/getBooking"
import { useState , useEffect } from "react"
import { BookingJson } from "../../interfaces"
import { LinearProgress } from "@mui/material"
import { Suspense } from "react"
import dayjs from "dayjs"
import Link from "next/link"

export default function ReservationCart() {
    
    const [booking, setBooking] = useState<BookingJson | null>(null);
    const [loading, setLoading] = useState(true);
    const {data:session} = useSession()
    console.log(session?.user.token)
    

    useEffect(() => {
        async function fetchData() {
            const data = await getBooking(session?.user.token ? session.user.token : '');
            setBooking(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                        <p className="text-lg text-gray-600">Loading ... <LinearProgress /></p>
                    ) : (
                        <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
                            {booking?.count === 0 ? (
                                <div className="text-center text-gray-500 text-lg py-5">
                                    No booking found.
                                </div>
                            ) : (
                                booking?.data.map((reservationItem) => (
                                    <div className='bg-slate-200 rounded px-5 mx-5 py-2 my-2'
                                        key={reservationItem._id}>
                                            <div className="text-md flex flex-row justify-between"><div>{reservationItem.campground?.name}</div><div><div>
                                                <Link key={reservationItem._id} href={`/cart/${reservationItem._id} `}>
                                                    <div className="hover:underline">Edit</div>
                                                </Link>
                                            </div></div></div>
                                            <div className="text-sm">Check-in :{dayjs(reservationItem.campingDate).format('DD/MM/YYYY')}</div>
                                            <div className="text-sm">Duration : {reservationItem.nights} days</div>
                                            <div className="text-sm">User : {reservationItem.user.name}</div>
                                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                                            text-white shadow-sm" 
                                        
                                            onClick={async () => {
                                                if (!reservationItem._id) {
                                                    console.error("Error: Booking ID is missing");
                                                    return;
                                                }
                                            
                                                try {
                                                    await deleteBooking(session?.user.token ?? "", reservationItem._id);
                                                    
                                                    setBooking((prevBooking) => {
                                                        if (!prevBooking) return prevBooking;
                                                        return {
                                                            ...prevBooking,
                                                            data: prevBooking.data.filter(item => item._id !== reservationItem._id),
                                                        };
                                                    });
                                            
                                                } catch (error) {
                                                    console.error("Failed to delete booking:", error);
                                                }
                                            }}
                                            >
                                                Remove from Booking
                                            </button>
                                            
                                    </div>
                                ))

                                

                            )
                            
                            }
                        
                </Suspense>
                    )
            }
        </>
    )
}
