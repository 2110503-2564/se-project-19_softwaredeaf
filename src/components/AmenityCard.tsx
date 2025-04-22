'use client'
import { AmenityItem } from "../../interface"

export default function AmenityCard({amenities,handleDelete}:{amenities:AmenityItem,handleDelete:Function}){
    
    return(
        <div className={`border border-black rounded-xl mb-3 flex flex-row`}>
            <p className="w-[25%] p-5 text-xl text-black font-normal">Name : {amenities.name}</p> 
            <p className="w-[40%] p-5 text-xl text-black font-normal">Description : {amenities.description}</p> 
            <p className="w-[15%] p-5 text-xl text-black font-normal">Quantity : {amenities.quantity}</p> 
            <p className="w-[15%] p-5 text-xl text-black font-normal">Price : {amenities.price}</p> 
            <div className="w-[5%] flex items-center">
                <button 
                    className="w-10 h-10 rounded-full bg-[#C46B65] flex items-center justify-center shadow-md hover:brightness-70"
                    onClick={()=>{handleDelete(amenities);}}
                    >
                    <img src="/img/delete.png" alt="Delete" className="w-6 h-6" />
                </button>
            </div>
        </div>
        
    )
}