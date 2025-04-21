'use client'
import { AmenityItem } from "../../interface"
import { useState } from "react";
import DateReserve from "./DateReserve";
import dayjs,{ Dayjs } from "dayjs";
import { TextField } from "@mui/material";



export default function AmenityEditItem({amenities,handleSubmit,handleDelete}:{amenities:AmenityItem,handleSubmit:Function,handleDelete:Function}){
    
    const [editBooking,setEditBooking]=useState<boolean>(false);
    const [deleteBooking,setDeleteBooking]=useState<boolean>(false);
    const toggleEdit = () => setEditBooking(prev => !prev);
    const toggleDelete = () => setDeleteBooking(prev => !prev);

    const [name,setName]=useState(amenities.name)
    const [description,setDescription]=useState(amenities.description)
    const [quantity,setQuantity]=useState<number>(amenities.quantity)
    const [price,setPrice]=useState<number>(amenities.price)

    const makeAmenityBooking = () => {
        if (name && description && quantity > 0 && price > 0 ) {
          const amenity: AmenityItem = {
            amountbooked:0,
            _id:amenities._id,
            name:name,
            description:description,
            image:amenities.image,
            campgroundId: amenities.campgroundId, 
            status:amenities.status,
            quantity: quantity,
            price:price
          };
          toggleEdit();
          return amenity;
        }
    };

    const deleteAmenityBooking = () => {
        if (name && description && quantity > 0 && price > 0 ) {
            const amenity: AmenityItem = {
                amountbooked:0,
                _id:amenities._id,
                name:name,
                description:description,
                image:amenities.image,
                campgroundId: amenities.campgroundId, 
                status:amenities.status,
                quantity: quantity,
                price:price
              };
          toggleDelete();
          return amenity;
        }
    };

    const cancelEdit = () => {
        setName(amenities.name);
        setDescription(amenities.description);
        setQuantity(amenities.quantity);
        setPrice(amenities.price);
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
                                <div className= "ml-5">
                                    <p>Name : </p> 
                                    <TextField size="small" id="outlined-basic" value={name} onChange={(e)=>{setName(e.target.value)}} variant="outlined" />
                                </div>

                                <div className= "ml-5">
                                    <p>Description : </p> 
                                    <TextField size="small" id="outlined-basic" value={description} onChange={(e)=>{setDescription(e.target.value)}} variant="outlined"/>
                                </div>
                                <div className= "ml-5">
                                    <p>Quantity : </p>   
                                    <div className="flex items-center">
                                        <input
                                        type="number"
                                        min="1"
                                        className="h-10 rounded-md border text-center"
                                        onChange={(e)=>setQuantity(Number(e.target.value))}
                                        value={quantity}
                                        />
                                    </div>
                                </div>

                                <div className= "ml-5">
                                    <p>Price : </p>   
                                    <div className="flex items-center">
                                        <input
                                        type="number"
                                        min="1"
                                        className="h-10 rounded-md border text-center"
                                        onChange={(e)=>setPrice(Number(e.target.value))}
                                        value={price}
                                        />
                                    </div>
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
                            <p className="w-[20%] p-5 text-base text-black font-normal">Name : {name}</p> 
                            <p className="w-[20%] p-5 text-base text-black font-normal">Description : {description}</p> 
                            <p className="w-[20%] p-5 text-base text-black font-normal">Quantity : {quantity}</p> 
                            <p className="w-[20%] p-5 text-base text-black font-normal">Price : {price}</p> 
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