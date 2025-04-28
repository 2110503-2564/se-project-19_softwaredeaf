'use client'
import { AmenityItem , AmenityBooking} from "../../interface"
import { useState } from "react";
import DateReserve from "./DateReserve";
import { Dayjs } from "dayjs";



export default function AmenityBookingItem({amenities,handleSubmit,bookfrom,bookto}:{amenities:AmenityItem,handleSubmit:Function,bookfrom?:Dayjs|null,bookto?:Dayjs|null}){
    
    const [viewDetail,setDetail]=useState<boolean>(false);
    const [viewAmenBook,setAmenBook]=useState<boolean>(false);
    const toggleDetail = () => setDetail(prev => !prev);
    const toggleBook = () => setAmenBook(prev => !prev);

    const [datefrom,setDatefrom]=useState<Dayjs|null>(null)
    const [dateto,setDateto]=useState<Dayjs|null>(null)
    const [amount,setAmount]=useState<number>(1)
    const amountLeft = amenities.quantity - amenities.amountbooked;

    const makeAmenityBooking = () => {
        if (datefrom && dateto && amount > 0 && amount <= amountLeft && dateto.format("YYYY-MM-DD") > datefrom.format("YYYY-MM-DD") ) {
          const booking: AmenityBooking = {
            _id:"",
            campgroundId: amenities.campgroundId ? amenities.campgroundId._id : "", 
            amenityTypeId: amenities,
            quantity: amount,
            startDate: datefrom.format("YYYY-MM-DD"),
            endDate: dateto.format("YYYY-MM-DD")
          };
        

          return booking;
        }
        else if(!datefrom){
            alert("Please insert Date From")
        }
        else if(!dateto){
            alert("Please insert Date To")
        }
        else if(amount<=0){
            alert("Amount must be more than 0")
        }
        else if(amount>amountLeft){
            alert("Amount must be can't more than "+amountLeft)
        }
        
    };

    return(
        <div className={`border border-black rounded-xl my-2`}>
           <div className="flex flex-row justify-around content-around">
                <p className="w-[35%] p-5 text-xl text-black font-normal">{amenities.name}</p> 
                <p className="w-[25%] p-5 text-xl text-black font-normal">Amount Left : {amountLeft}</p> 
                <div className="w-[20%] flex justify-center items-center">
                    <button name="View Detail" className='w-[80%] py-2 text-base bg-[#A4B465] text-50px text-black font-normal rounded-xl hover:bg-[#626F47]
                    hover:text-white hover:border-transparent' onClick={()=>{toggleDetail();setAmenBook(false);}}>View Detail</button>
                </div>
                <div className="w-[20%] flex justify-center items-center">
                    <button name="Book Amenity" className='w-[80%] py-2 text-base bg-[#A4B465] text-black font-normal py-2 px-2 rounded-xl hover:bg-[#626F47]
                    hover:text-white hover:border-transparent' onClick={()=>{toggleBook();setDetail(false);}}>Add</button>
                </div>
            </div> 
            {
                viewDetail ? <p className="w-[35%] p-5 text-xl text-black font-normal">{amenities.description}</p> 
                : null
            }
            {
                viewAmenBook ? 
                
                <div className="text-black text-xl">
                    <p className= "ml-5">Date:</p>               
                    <div className="grid grid-cols-2 m-5">
                        <div className="flex items-center gap-5 mb-5">
                            <p className="m-0">From</p>
                            <DateReserve onDateChange={(value:Dayjs)=>{setDatefrom(value)}} dateName="Start Date" minDate={bookfrom} maxDate={bookto}/> 
                        </div>
                        <div className="flex items-center gap-5 mb-5">
                            <p className="m-0 mr-6">To</p>
                            <DateReserve onDateChange={(value:Dayjs)=>{setDateto(value)}} dateName="End Date" minDate={datefrom} maxDate={bookto}/>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mb-5">
                        <p className= "ml-5">Amount:</p>   
                        <input
                            type="number"
                            min="1"
                            max={amountLeft}
                            className="w-15 h-10 rounded-md border text-center"
                            onChange={(e)=>setAmount(Number(e.target.value))}
                            defaultValue={1}
                            />
                    </div>
                    
                    <div className="mr-5 mb-5 flex justify-end">
                        <button name="Submit Amenity" className='py-2 text-base bg-[#A4B465] text-black font-normal py-2 px-2 rounded-xl hover:bg-[#626F47]
                         hover:text-white hover:border-transparent' onClick={()=>{const newbooking = makeAmenityBooking(); handleSubmit(newbooking);}}>Submit</button>
                    </div>
                </div>
                : null
            }
        </div>
        
    )
}