// import BottomMenu from "@/components/BottomMenu"
'use client'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import DateReserve from '@/components/DateReserve';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { CampgroundItem } from '../../../interface';

export default function booking(){
    const [campground,setCampground] = useState("");
    const [amenity,setAmenity]=useState("");

    //mock data
    const mockData:CampgroundItem[]=[
        {
          _id: "cg001",
          name: "River Valley Retreat",
          address: "123 Riverside Rd",
          district: "Chiang Dao",
          province: "Chiang Mai",
          postalcode: "50170",
          tel: "0812345678",
          region: "North",
        },
        {
          _id: "cg002",
          name: "Sandy Shores Camp",
          address: "45 Beachside Ave",
          district: "Hua Hin",
          province: "Prachuap Khiri Khan",
          postalcode: "77110",
          tel: "0823456789",
          region: "Central",
        },
        {
          _id: "cg003",
          name: "Mountain Breeze Basecamp",
          address: "9 Mountain View Rd",
          district: "Pak Chong",
          province: "Nakhon Ratchasima",
          postalcode: "30130",
          tel: "0834567890",
          region: "Northeast",
        },
        {
          _id: "cg004",
          name: "Jungle Hideaway",
          address: "77 Forest Trail",
          district: "Khlong Thom",
          province: "Krabi",
          postalcode: "81120",
          tel: "0845678901",
          region: "South",
        },
      ];

    return (
        <div 
        className="py-20 pl-40 flex w-[70%] h-[50%] bg-white border border-[#A4B465] rounded-[40px] my-40 m-auto shadow-lg">
            <div className="text-black text-xl">
                <div className='flex items-center gap-40 font-semibold'>
                    <div className="m-5">
                        <p className="font-semibold mb-2">Name:</p>
                        <TextField id="outlined-basic" label="Name" variant="outlined" />
                    </div>
                    <div className="m-5">
                        <p className="font-semibold mb-2">Surname:</p>
                        <TextField id="outlined-basic" label="Surname" variant="outlined" />
                    </div>
                </div>
                
                <div className='flex items-center gap-3 font-semibold'>
                    <div className="m-5">
                        <p className="font-semibold mb-2 ">Date:</p>

                        <div className="flex items-center gap-5 font-semibold mb-5">
                            <p className="m-0">From</p>
                            <DateReserve dateName="Start Date" />
                        </div>
                    </div>
                    <div className="m-5">
                        <p className="font-semibold mb-2 ml-11">Date:</p>
                        <div className="flex items-center gap-5 font-semibold mb-5">
                            <p className="m-0">To</p>
                            <DateReserve dateName="End Date" />
                        </div>
                    </div>
                </div>
                
                <div className="m-5">
                    <div className="flex items-center gap-[42%] font-semibold mb-5">
                        <div>
                            <p className="font-semibold mb-5">Campground:</p>
                            <Select
                            id="campgroundSelect"
                            value={campground} 
                            label={campground}
                            onChange={(e)=>(setCampground(e.target.value))}
                            >
                            {mockData.map((cg: CampgroundItem) => (
                                <MenuItem key={cg._id} value={cg._id}>
                                    {cg.name}
                                </MenuItem>
                            ))}
                            </Select>
                        </div>

                        <div>
                            <p className="font-semibold mb-5">Amenities:</p>
                            <Select
                            id="amenitySelect"
                            value={amenity} 
                            label={amenity}
                            onChange={(e)=>(setAmenity(e.target.value))}
                            >
                                <MenuItem value="Amenity1">amenity1</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
    )
        
    
}