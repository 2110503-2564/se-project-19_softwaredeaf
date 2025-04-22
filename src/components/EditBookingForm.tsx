'use client'
import { TextField } from "@mui/material";
import DateReserve from "./DateReserve";
import { useState } from "react";
import dayjs,{ Dayjs } from "dayjs";
import { AmenityBooking , ReservationItem , AmenityBookingItemFetch} from "../../interface"
import AmenityBookingEditItem from "./AmenityBookingEdit";
import { useSession } from "next-auth/react";
import editBooking from "@/libs/editBooking";
import editAmenityBooking from "@/libs/editAmenityBooking";
import deleteAmenityBooking from "@/libs/deleteAmenityBooking";


export default function EditBookingForm({amenities,bookingId,booking}:{amenities:AmenityBookingItemFetch[],bookingId:string,booking:ReservationItem}){
    const { data: session, status }=useSession();
    if(!session || !session.user) return (<div>lol</div>);
    const token=session.user.token;

    const [name,setName]=useState(booking.name);
    const [surname,setSurname]=useState(booking.surname);
    const [datefrom,setDatefrom]=useState<Dayjs|null>(dayjs(booking.startDate))
    const [dateto,setDateto]=useState<Dayjs|null>(dayjs(booking.endDate))

    const amenitiesBooking: AmenityBooking[] = [];
    const [viewDetail,setDetail]=useState<boolean>(false);
    const [viewAmenBook,setAmenBook]=useState<boolean>(false);
    const [amenBookList,setAmenList]=useState<AmenityBooking[]>([])
    const [deletesAmenBookList,setDeleteAmenList]=useState<AmenityBooking[]>([])

    const commitBooking = (newbooking:AmenityBooking)=>{
        if(newbooking){
            const existing = amenBookList.findIndex(item => 
                (item.amenityTypeId._id === newbooking.amenityTypeId._id ))
            if (existing>=0) {
                const updatedList = [...amenBookList];
                updatedList[existing] = {
                  ...updatedList[existing],
                  quantity: newbooking.quantity,
                  startDate: newbooking.startDate,
                  endDate: newbooking.endDate,
                };
                setAmenList(updatedList);
                alert('Update Amenity!');
            }else{
                setAmenList(prev => [...prev, newbooking]);
                alert('Booking Amenity Success!');
            }
            console.log("Update List");
            console.log(amenBookList);
        }
    }

    const deleteBooking =  (deleteAmenity:AmenityBooking)=>{
        if(deleteAmenity){
            setAmenList((prevList) =>
                prevList.filter(
                  (item) => item.amenityTypeId._id !== deleteAmenity.amenityTypeId._id
                )
            );
            setDeleteAmenList(prev => [...prev, deleteAmenity]);
            alert(`Delete ${deleteAmenity.amenityTypeId.name}!`);
            console.log("Update List");
            console.log(amenBookList);
            console.log("Delete List");
            console.log(deletesAmenBookList);
        }
    }
    
    const handleClick = async (name:string , surname:string , startDate:string, endDate:string) => {
        if(token&&bookingId&&name&&surname&&startDate&&endDate){
            try{
                await editBooking(token,bookingId,name,surname,startDate,endDate);
            }catch(error){
                alert('Edit Booking Failed!');
                console.log(error);
                return;
            }
            if(amenBookList.length > 0){
                amenBookList.forEach(async (item) => {
                    try{
                        console.log(item.amenityTypeId._id);
                        await editAmenityBooking(token,item);
                    }catch(error){
                        alert('Edit Amenity Booking Failed!');
                        console.log(error);
                        return;
                    }
                })
                setAmenList([]);
            }
            console.log("Delete List");
            console.log(deletesAmenBookList);
            if(deletesAmenBookList.length > 0){
                deletesAmenBookList.forEach(async (item) => {
                    try{
                        await deleteAmenityBooking(token,item._id);
                    }catch(error){
                        alert('Delete Amenity Booking Failed!');
                        console.log(error);
                        return;
                    }
                })
                setDeleteAmenList([]);
                
            }
            alert('Update Booking Success!');
        }else{
            alert('ข้อมูลไม่ครบ');
        }
    }
//testing
    return(
        <div>
            <div className="relative text-2xl ">
                <div>
                    <p className="p-5 text-3xl text-black font-semibold">Booking details</p>
                    <div className="text-black text-xl flex flex-row">
                        <div className="w-[50%]">
                            <div className="m-5">
                                <p className="font-semibold mb-2">Name:</p>
                                <TextField className="w-[100%]" id="outlined-basic" label="Name" value={name} onChange={(e)=>{setName(e.target.value)}} variant="outlined"/>
                            </div>
                            <div className="m-5">
                                <p className="font-semibold mb-2">Surname:</p>
                                <TextField className="w-[100%]" id="outlined-basic" label="Surname" value={surname} onChange={(e)=>setSurname(e.target.value)} variant="outlined" />
                            </div>
                        </div>

                        <div className="ml-10 w-[50%]">
                            <div className="m-5">
                                <p className="font-semibold mb-2 ">Date:</p>
                                <div className="flex items-center gap-5 font-semibold mb-5">
                                    <p className="m-0">From</p>
                                    <DateReserve onDateChange={(value:Dayjs)=>{setDatefrom(value)}} dateName="Start Date" initDate={datefrom}/>
                                </div>
                            </div>
                            
                            <div className=" font-semibold m-5">
                                <div className="flex items-center gap-5 font-semibold mb-5 mt-[9%]">
                                    <p className="m-0 mr-6">To</p>
                                    <DateReserve onDateChange={(value:Dayjs)=>{setDateto(value)}} dateName="End Date" minDate={datefrom} initDate={dateto} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="">
                    <p className="text-3xl text-black font-semibold">Amenities</p>
                    <div className="h-[100%] rounded-lg bg-white mt-2 shadow-md p-5 overflow-y-auto">

                        {
                            amenities.length > 0 ? amenities.map((AmenityItem:AmenityBookingItemFetch)=>(
                                <AmenityBookingEditItem amenities={AmenityItem} handleSubmit={commitBooking} handleDelete={deleteBooking}/>
                            ))
                            : <p className="p-5 text-xl text-black font-normal">No amenities</p> 
                        }
                    </div>
                </div>
                <div className="py-5 flex justify-end">
                    <button name="Book Campground" className=' w-[200px] bg-[#A4B465] text-black font-normal py-2 px-2 rounded-xl hover:bg-[#626F47]
                        hover:text-white hover:border-transparent' 
                        onClick={() => { if(datefrom&&dateto)
                            handleClick(name , surname , datefrom?.format("YYYY-MM-DD").toString() , dateto?.format("YYYY-MM-DD"));
                        }}
                    >Update Booking</button>
                </div>
            </div>
        </div>
    )
}