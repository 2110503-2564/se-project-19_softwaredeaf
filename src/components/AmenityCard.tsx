'use client'
import { AmenityItem } from "../../interface"

export default function AmenityCard({amenities,handleDelete}:{amenities:FormData,handleDelete:Function}){
    const name = amenities.get('name');
    const description = amenities.get('description');
    const quantity = amenities.get('quantity');
    const price = amenities.get('price');
    return(
        <div className={`border border-black rounded-xl mb-3 flex flex-row`}>
            <p className="w-[25%] p-5 text-xl text-black font-normal">Name : {name instanceof File ? `${name.name}` : name ?? 'No file uploaded'}</p> 
            <p className="w-[40%] p-5 text-xl text-black font-normal">Description : {description instanceof File ? `${description.name}` : description ?? 'No file uploaded'}</p> 
            <p className="w-[15%] p-5 text-xl text-black font-normal">Quantity : {quantity instanceof File ? `${quantity.name}` : quantity ?? 'No file uploaded'}</p> 
            <p className="w-[15%] p-5 text-xl text-black font-normal">Price : {price instanceof File ? `${price.name}` : price ?? 'No file uploaded'}</p> 
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