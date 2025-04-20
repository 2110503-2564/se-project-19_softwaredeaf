'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import createCampground from "@/libs/createCampground";
import { useRouter } from 'next/navigation';
import { AmenityItem , CampgroundItem} from "../../../../../interface";
import AmenityCard from "@/components/AmenityCard";
import { TextField } from "@mui/material";
import createAmenity from "@/libs/createAmenity";

export default function NewCampground() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [tel, setTel] = useState("");
  const [region, setRegion] = useState("");
  const [amenities, setAmenities] = useState<AmenityItem[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const [amenityName, setAmenityName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const [, part1, part2, part3] = match;
      if (part3) {
        return `${part1}-${part2}-${part3}`;
      } else if (part2) {
        return `${part1}-${part2}`;
      } else if (part1) {
        return part1;
      }
    }
    return value;
  };

  const handleCreate = async () => {
    try {
      if (!session?.user.token) throw new Error("No token");
      const newCamp = await createCampground(session.user.token, {
        name,
        address,
        district,
        province,
        postalcode,
        tel,
        region,
      });
      
      await Promise.all(
        amenities.map(item =>
          createAmenity(item, newCamp.data._id, session.user.token)
        )
      );

      alert("Campground created!");
      router.push(`/campground/${newCamp.data._id}`);
    } catch (err) {
        alert("Error creating campground");
        console.error(err);
    }
  };

  const handleAddAmenity = () => {
    if(amenityName&&description&&quantity&&price){
        const newAmenity: AmenityItem = {
            campgroundId: null, 
            _id: "",
            name: amenityName,
            description: description,
            image:image,
            quantity: quantity,
            status: "",
            price: price,
        };
        setAmenities(prev => [...prev, newAmenity]);
        setAmenityName("");
        setDescription("");
        setImage("");
        setQuantity(0);
        setPrice(0);
        alert('Added Amenity!');
    }
  };

  const handleDelete = (deleteAmenity:AmenityItem) => {
    if(deleteAmenity){
        setAmenities(prevList =>
            prevList.filter(item => item.name !== deleteAmenity.name)
        );
    }
  }

  return (
    <div className="p-10 text-black w-[80vw]">
          <h1 className="text-2xl font-bold mb-4">Create New Campground</h1>
          <form className="flex flex-col gap-3 border border-black p-10 rounded-xl w-[50vw]">
            <div className="grid grid-cols-2">
              <p>Campground Name</p>
              <input value={name} onChange={(e) => setName(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Name" />
            </div>
            <div className="grid grid-cols-2">
              <p>Address</p>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Address" />
            </div>
            <div className="grid grid-cols-2">
              <p>District</p>
              <input value={district} onChange={(e) => setDistrict(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="District" />
            </div>
            <div className="grid grid-cols-2">
              <p>Province</p>
              <input value={province} onChange={(e) => setProvince(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Province" />
            </div>
            <div className="grid grid-cols-2">
              <p>Postal Code</p>
              <input value={postalcode} onChange={(e) => setPostalcode(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Postalcode" />
            </div>
            <div className="grid grid-cols-2">
              <p>Region</p>
              <input value={region} onChange={(e) => setRegion(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Region" />
            </div>
            <div className="grid grid-cols-2">
              <p>Tel</p>
              <input value={tel} onChange={(e) => setTel(formatPhoneNumber(e.target.value))} maxLength={12} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Telephone" />
            </div>
            <button
              type="button"
              onClick={handleCreate}
              className="bg-[#A4B465] text-white mt-5 px-4 py-2 rounded-xl hover:bg-[#626F47] w-[30%]"
            >
              Create
            </button>
          </form>

      <div>
        <div className="flex flex-row">
            <p className="text-xl text-black text-base font-normal m-5">Create Amenity</p>
            {/* <button
            type="button"
            onClick={()=>handleAddAmenity}
            className="bg-[#A4B465] text-black mt-5 px-4 py-2 rounded-xl hover:bg-[#626F47] absolute right-10"
            >Add Amenity</button> */}
        </div>
        <div className="border border-black py-5 px-10 rounded-xl">
            <div className="text-black text-lg">       
                <div className="gap-5">
                  <div className="flex flex-row mb-10">
                    <p>Name:</p>   
                    <TextField className="w-[490px]" size="small" id="outlined-basic" label="AmenityName" value={amenityName} onChange={(e)=>{setAmenityName(e.target.value)}} variant="outlined"/>
                    <p className= "ml-5">Description:</p>   
                    <TextField className="w-full" size="small" id="outlined-basic" label="Description" value={description} onChange={(e)=>{setDescription(e.target.value)}} variant="outlined"/>
                    
                  </div>
                    <div className="relative flex flex-row">
                      <p>Image Link:</p>   
                      <TextField size="small" id="outlined-basic" label="Image" value={image} onChange={(e)=>{setImage(e.target.value)}} variant="outlined"/>
                        <p className= "ml-5">Amount:</p>   
                        <input
                            type="number"
                            min="0"
                            className="w-[100px] h-10 rounded-md border text-center"
                            onChange={(e)=>setQuantity(Number(e.target.value))}
                            value={quantity}
                            />
                        <p className= "ml-5">Price:</p>   
                        <input
                            type="number"
                            min="0"
                            className="w-[150px] h-10 rounded-md border text-center"
                            onChange={(e)=>setPrice(Number(e.target.value))}
                            value={price}
                            />
                            <div className="flex absolute right-0">
                              <button name="Submit Amenity" className='py-2 text-base bg-[#A4B465] text-black font-normal py-2 px-2 rounded-xl hover:bg-[#626F47]
                              hover:text-white hover:border-transparent' onClick={()=>handleAddAmenity()}>Add Amenity</button>
                            </div> 
                    </div>
                </div>
            </div>
        </div>
      </div>
      <p className="ml-5 my-3"> Amenities </p>
      {
        amenities.map((amenity)=>(
          <AmenityCard amenities={amenity} handleDelete={handleDelete}/>
        ))
      }
    </div>
  );
}
