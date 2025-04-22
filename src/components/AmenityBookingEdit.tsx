'use client'
import { AmenityBooking , AmenityBookingItemFetch} from "../../interface"
import { useState } from "react";
import DateReserve from "./DateReserve";
import dayjs,{ Dayjs } from "dayjs";



export default function AmenityBookingEditItem({amenities,handleSubmit,handleDelete}:{amenities:AmenityBookingItemFetch,handleSubmit:Function,handleDelete:Function}){
    
    const [editBooking,setEditBooking]=useState<boolean>(false);
    const [deleteBooking,setDeleteBooking]=useState<boolean>(false);
    const toggleEdit = () => setEditBooking(prev => !prev);
    const toggleDelete = () => setDeleteBooking(prev => !prev);

    const [datefrom,setDatefrom]=useState<Dayjs|null>(dayjs(amenities.startDate))
    const [dateto,setDateto]=useState<Dayjs|null>(dayjs(amenities.endDate))
    const [amount,setAmount]=useState<number>(amenities.amount)

    const makeAmenityBooking = () => {
        if (datefrom && dateto && amount > 0 && dateto.format("YYYY-MM-DD") >= datefrom.format("YYYY-MM-DD") ) {
          const booking: AmenityBooking = {
            _id:amenities._id,
            campgroundId: amenities.campgroundBookingId._id, 
            amenityTypeId: amenities.campgroundAmenityId,
            quantity: amount,
            startDate: datefrom.format("YYYY-MM-DD"),
            endDate: dateto.format("YYYY-MM-DD")
          };
          toggleEdit();
          return booking;
        }
    };

    const deleteAmenityBooking = () => {
        if (datefrom && dateto && amount > 0 && dateto.format("YYYY-MM-DD") >= datefrom.format("YYYY-MM-DD") ) {
          const booking: AmenityBooking = {
            _id:amenities._id,
            campgroundId: amenities.campgroundBookingId._id, 
            amenityTypeId: amenities.campgroundAmenityId,
            quantity: amount,
            startDate: datefrom.format("YYYY-MM-DD"),
            endDate: dateto.format("YYYY-MM-DD")
          };
          toggleDelete();
          return booking;
        }
    };

    const cancelEdit = () => {
        setDatefrom(dayjs(amenities.startDate));
        setDateto(dayjs(amenities.endDate));
        setAmount(amenities.amount);
        toggleEdit();
    }

    return(
        <div>
            {
                deleteBooking ? null :
                <div className={`border border-black rounded-xl my-2`}>
                    {
                        editBooking ? 
                            <div className="flex flex-row justify-around content-around items-center p-5 text-base text-black font-normal">
                                <p className="w-[20%] p-5">{amenities.campgroundAmenityId.name}</p>      

                                <p className= "ml-5">Amount :</p>   
                                <div className="flex items-center gap-5 mb-5">
                                    <input
                                    type="number"
                                    min="1"
                                    max={amenities.amount}
                                    className="w-15 h-10 rounded-md border text-center"
                                    onChange={(e)=>setAmount(Number(e.target.value))}
                                    defaultValue={amount}
                                    />
                                </div>

                                <p className="m-0">From</p>
                                <div className="flex items-center gap-5 mb-5">
                                    <DateReserve onDateChange={(value:Dayjs)=>{setDatefrom(value)}} dateName="Start Date" minDate={dayjs(amenities.startDate)} maxDate={dayjs(amenities.endDate)} initDate={datefrom}/> 
                                </div>

                                <p className="m-0 mr-6">To</p>
                                <div className="flex items-center gap-5 mb-5">
                                    <DateReserve onDateChange={(value:Dayjs)=>{setDateto(value)}} dateName="End Date" minDate={dayjs(amenities.startDate)} maxDate={dayjs(amenities.endDate)} initDate={dateto}/>
                                </div>

                                <button 
                                    className="w-10 h-10 rounded-full bg-[#67AD5E] flex items-center justify-center shadow-md hover:brightness-70"
                                    onClick={()=>handleSubmit(makeAmenityBooking())}
                                    >
                                    <img src="/img/save.png" alt="Delete" className="w-6 h-6" />
                                </button>

                                <button 
                                    className="w-10 h-10 rounded-full bg-[#CC3B3B] flex items-center justify-center shadow-md hover:brightness-70"
                                    onClick={cancelEdit}
                                    >
                                    <img src="/img/cancel.png" alt="Edit" className="w-6 h-6" />
                                </button>
                            </div>
                        : 
                        <div className="flex flex-row justify-around content-around items-center">
                            <p className="w-[20%] p-5 text-base text-black font-normal">{amenities.campgroundAmenityId.name}</p> 
                            <p className="w-[20%] p-5 text-base text-black font-normal">Amount : {amount}</p> 
                            <p className="w-[20%] p-5 text-base text-black font-normal">From : {datefrom?.format('DD/MM/YYYY').toString()}</p> 
                            <p className="w-[20%] p-5 text-base text-black font-normal">To : {dateto?.format('DD/MM/YYYY').toString()}</p> 
                            <button 
                                className="w-10 h-10 rounded-full bg-[#FFB900] flex items-center justify-center shadow-md hover:brightness-70"
                                onClick={toggleEdit}
                                >
                                <img src="/img/edit.png" alt="Edit" className="w-6 h-6" />
                            </button>
                            <button 
                                className="w-10 h-10 rounded-full bg-[#C46B65] flex items-center justify-center shadow-md hover:brightness-70"
                                onClick={()=>{handleDelete(deleteAmenityBooking());}}
                                >
                                <img src="/img/delete.png" alt="Delete" className="w-6 h-6" />
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
        
    )
}