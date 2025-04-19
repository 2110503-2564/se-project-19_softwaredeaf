'use client'
import { TextField } from "@mui/material";
import DateReserve from "./DateReserve";
import { useState } from "react";
import dayjs,{ Dayjs } from "dayjs";
import { AmenityItem , AmenityBooking} from "../../interface"
import AmenityBookingItem from "./AmenityBookingItem";

export default function BookingForm({amenities}:{amenities:AmenityItem[]}){

    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [datefrom,setDatefrom]=useState<Dayjs|null>(null)
    const [dateto,setDateto]=useState<Dayjs|null>(null)

    const amenitiesBooking: AmenityBooking[] = [];
    const [viewDetail,setDetail]=useState<boolean>(false);
    const [viewAmenBook,setAmenBook]=useState<boolean>(false);
    const [amenBookList,setAmenList]=useState<AmenityBooking[]>([])

    const commitBooking =  (newbooking:AmenityBooking)=>{
        if(newbooking){
            const existing = amenBookList.findIndex(item => item.amenityTypeId == newbooking.amenityTypeId);
            if (existing>=0) {
                const updatedList = [...amenBookList];
                updatedList[existing] = {
                  ...updatedList[existing],
                  quantity: newbooking.quantity,
                };
                setAmenList(updatedList);
                alert('Update Amenity!');
            }else{
                setAmenList(prev => [...prev, newbooking]);
                alert('Booking Amenity Success!');
            }
        }
    }

    const deleteBooking =  (deleteAmenity:AmenityBooking)=>{
        if(deleteAmenity){
            setAmenList((prevList) =>
                prevList.filter(
                  (item) => item.amenityTypeId != deleteAmenity.amenityTypeId
                )
            );
            alert(`Delete ${deleteAmenity.amenityTypeId.name}!`);
        }
    }

    return(
        <div>
            <div className="relative flex text-2xl flex-row justify-around content-around pr-20">
                <div className="w-[40%]">
                    <p className="p-5 text-3xl text-black font-semibold">Enter your details</p>
                    <div className="text-black text-xl">
                        <div className="m-5">
                            <p className="font-semibold mb-2">Name:</p>
                            <TextField id="outlined-basic" label="Name" value={name} onChange={(e)=>{setName(e.target.value)}} variant="outlined"/>
                        </div>
                        <div className="m-5">
                            <p className="font-semibold mb-2">Surname:</p>
                            <TextField id="outlined-basic" label="Surname" value={surname} onChange={(e)=>setSurname(e.target.value)} variant="outlined" />
                        </div>
                        
                        <div className="m-5">
                            <p className="font-semibold mb-2 ">Date:</p>
                            <div className="flex items-center gap-5 font-semibold mb-5">
                                <p className="m-0">From</p>
                                <DateReserve onDateChange={(value:Dayjs)=>{setDatefrom(value)}} dateName="Start Date" />
                            </div>
                        </div>
                        
                        <div className=" font-semibold m-5">
                            <div className="flex items-center gap-5 font-semibold mb-5">
                                <p className="m-0 mr-6">To</p>
                                <DateReserve onDateChange={(value:Dayjs)=>{setDateto(value)}} dateName="End Date" minDate={datefrom} />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="w-[60%]">
                    <div className="border border-black rounded-lg bg-white mt-2 shadow-md p-5">
                        <p className="text-3xl text-black font-semibold">Amenities</p>

                        {
                            amenities ? amenities.map((AmenityItem:AmenityItem)=>(
                                <div>
                                    <AmenityBookingItem amenities={AmenityItem} handleSubmit={commitBooking} bookfrom={datefrom} bookto={dateto}/>
                                </div>
                            ))
                            : <p className="p-5 text-xl text-black font-normal">No amenities</p> 
                        }
                    </div>
                    <div className="py-5 flex justify-end">
                        <button name="Book Campground" className=' w-[200px] bg-[#A4B465] text-black font-semibold py-2 px-2 rounded-xl hover:bg-[#626F47]
                        hover:text-white hover:border-transparent' onClick={()=>alert("Booked Just Kidding")}>Book</button>
                    </div>
                </div>
            </div>
            <div>
                    {
                        amenBookList.length == 0 ?                 
                        ' ' :
                        <div className="flex flex-row">
                            <p className="pl-5 text-black text-xl font-semibold mb-2">Amenities:</p>
                            <p className="pl-5 text-black text-s font-thin mb-2">click for delete</p>
                        </div>
                    }
                    {
                        amenBookList.length == 0 ?                 
                            ' ' :
                            amenBookList.map((amenBook)=>(
                                <div className="border border-black rounded-xl my-2 flex flex-row justify-around content-around p-5 text-base text-black font-normal"
                                onClick={()=>deleteBooking(amenBook)}>
                                    <p className="w-[35%]">{amenBook.amenityTypeId.name}</p> 
                                    <p className="w-[20%]">Amount : {amenBook.quantity}</p> 
                                    <p className="w-[20%]">From : {amenBook.startDate}</p> 
                                    <p className="w-[20%]">To : {amenBook.endDate}</p>
                                </div> 
                            ))
                    }
            </div>
        </div>
    )
}