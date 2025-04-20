'use client'
import { TextField } from "@mui/material";
import DateReserve from "./DateReserve";
import { useState,useEffect } from "react";
import dayjs,{ Dayjs } from "dayjs";
import { AmenityItem , AmenityBooking} from "../../interface"
import AmenityBookingItem from "./AmenityBookingItem";
// import { useTransition } from 'react';
// import { authOptions } from "@/app/utils/authOptions";
// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/createBooking";
import createAmenityBooking from "@/libs/createAmenityBooking";


export default function BookingForm({amenities,campsId}:{amenities:AmenityItem[],campsId:string}){
    const { data: session, status }=useSession();
    if(!session || !session.user) return (<div>lol</div>);
    const token=session.user.token;

    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [datefrom,setDatefrom]=useState<Dayjs|null>(null)
    const [dateto,setDateto]=useState<Dayjs|null>(null)

    const amenitiesBooking: AmenityBooking[] = [];
    const [viewDetail,setDetail]=useState<boolean>(false);
    const [viewAmenBook,setAmenBook]=useState<boolean>(false);
    const [amenBookList,setAmenList]=useState<AmenityBooking[]>([])

    const commitBooking = (newbooking:AmenityBooking)=>{
        if(newbooking){
            const existing = amenBookList.findIndex(item => 
                (item.amenityTypeId == newbooking.amenityTypeId && 
                    (item.startDate!=newbooking.startDate ||
                    item.endDate==newbooking.endDate )))
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
    
    const handleClick = async (name:string , surname:string , startDate:string, endDate:string) => {
        if(token&&campsId&&name&&surname&&startDate&&endDate){
            var bookingId = '';
            try{
                const res = await createBooking(token,campsId,name,surname,startDate,endDate);
                bookingId = res.data._id;
                
            }catch(error){
                alert('Booking Failed!');
                console.log(error);
                return;
            }
            if(amenBookList.length > 0){
                amenBookList.forEach(async (item) => {
                    try{
                        await createAmenityBooking(token,bookingId,item);
                    }catch(error){
                        alert('Booking Failed!');
                        console.log(error);
                        return;
                    }
                })
            }
            alert('Booking Success!');
        }else{
            alert('ข้อมูลไม่ครบ');
        }
    }
//testing
    return(
        <div>
            <div className="relative flex text-2xl flex-row justify-around content-around">
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

                <div className="w-[60%] h-[59vh]">
                    <div className="border border-black h-[100%] rounded-lg bg-white mt-2 shadow-md p-5 overflow-y-auto">
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
                    
                </div>
            </div>
            <div>
                    {
                        amenBookList.length == 0 ?                 
                        ' ' :
                        <div className="flex flex-row w-[70%]">
                            <p className="pl-5 text-black text-xl font-semibold mb-2">Amenities:</p>
                            <p className="pl-5 text-black text-s font-thin mb-2">click for delete</p>
                        </div>
                    }
                    {
                        amenBookList.length == 0 ?                 
                            ' ' :
                            amenBookList.map((amenBook)=>(
                                <div className="border border-black rounded-xl my-2 flex flex-row justify-around content-around p-5 text-base text-black font-normal"
                                // onClick={()=>deleteBooking(amenBook)}
                                >
                                    <p className="w-[35%]">{amenBook.amenityTypeId.name}</p> 
                                    <p className="w-[20%]">Amount : {amenBook.quantity}</p> 
                                    <p className="w-[20%]">From : {amenBook.startDate}</p> 
                                    <p className="w-[20%]">To : {amenBook.endDate}</p>
                                    <button 
                                        className="mt-5 w-16 h-16 rounded-full bg-[#C46B65] flex items-center justify-center shadow-md hover:brightness-70"
                                        onClick={()=>deleteBooking(amenBook)}
                                    >
                                        <img src="/img/delete.png" alt="Delete" className="w-6 h-6" />
                                    </button>
                                </div> 
                            ))
                    }
            </div>
            <div className="py-5 flex justify-end">
                <button name="Book Campground" className=' w-[200px] bg-[#A4B465] text-black font-semibold py-2 px-2 rounded-xl hover:bg-[#626F47]
                    hover:text-white hover:border-transparent' 
                    onClick={() => { if(datefrom&&dateto)
                        handleClick(name , surname , datefrom?.format("YYYY-MM-DD").toString() , dateto?.format("YYYY-MM-DD"));
                      }}
                >Book</button>
            </div>
        </div>
    )
}