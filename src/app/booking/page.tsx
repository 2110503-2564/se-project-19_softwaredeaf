// import BottomMenu from "@/components/BottomMenu"
'use client'
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import DateReserve from '@/components/DateReserve';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { CampgroundItem, CampgroundJson } from '../../../interface';
import { Dayjs } from 'dayjs';
import { useSession } from 'next-auth/react';
import getCampgrounds from '@/libs/getCampgrounds';
import { useSearchParams } from 'next/navigation';

export default function booking(){

    const searchParams = useSearchParams(); // ใช้เพื่อดึงพารามิเตอร์จาก URL
    const selectedCampground = searchParams.get('id');

    const [campgrounds,setCampgrounds] = useState<CampgroundJson|null>(null)
    const [pickCampground,setPickcampground] = useState(selectedCampground || null);
    const [amenity,setAmenity]=useState("");
    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [datefrom,setDatefrom]=useState<Dayjs|null>(null)
    const [dateto,setDateto]=useState<Dayjs|null>(null)

    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getCampgrounds();
            setCampgrounds(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    
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
        className="relative py-20 pl-40 flex w-[70%] h-[50%] bg-white border border-[#A4B465] rounded-[40px] my-40 m-auto shadow-lg">
            <div className="text-black text-xl">
                <div className='flex items-center gap-40 font-semibold'>
                    <div className="m-5">
                        <p className="font-semibold mb-2">Name:</p>
                        <TextField className='w-full' id="outlined-basic" label="Name" value={name} onChange={(e)=>{setName(e.target.value)}} variant="outlined"/>
                    </div>
                    <div className="m-5">
                        <p className="font-semibold mb-2">Surname:</p>
                        <TextField id="outlined-basic" label="Surname" value={surname} onChange={(e)=>setSurname(e.target.value)} variant="outlined" />
                    </div>
                </div>
                
                <div className='flex items-center gap-3 font-semibold'>
                    <div className="m-5">
                        <p className="font-semibold mb-2 ">Date:</p>

                        <div className="flex items-center gap-5 font-semibold mb-5">
                            <p className="m-0">From</p>
                            <DateReserve onDateChange={(value:Dayjs)=>{setDatefrom(value)}} dateName="Start Date" />
                        </div>
                    </div>
                    <div className="m-5">
                        <p className="font-semibold mb-2 ml-11">Date:</p>
                        <div className="flex items-center gap-5 font-semibold mb-5">
                            <p className="m-0">To</p>
                            <DateReserve onDateChange={(value:Dayjs)=>{setDateto(value)}} dateName="End Date" />
                        </div>
                    </div>
                </div>
                
                <div className="m-5">
                    <div className="flex items-center gap-[42%] font-semibold mb-5">
                        <div>
                            <p className="font-semibold mb-5">Campground:</p>
                            <Select
                            id="campgroundSelect"
                            className='w-[270px]'
                            value={pickCampground} 
                            label={pickCampground}
                            onChange={(e)=>(setPickcampground(e.target.value))}
                            >
                            {
                                    campgrounds?.data.map((campgroundItem: CampgroundItem) => (
                                        <MenuItem key={campgroundItem._id} value={campgroundItem._id}>{campgroundItem.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>

                        <div className='ml-[-130px]'>
                            <p className="font-semibold mb-5">Amenities:</p>
                            <Select
                            className='w-[200px]'
                            id="amenitySelect"
                            label={amenity}
                            value={amenity}
                            onChange={(e)=>(setAmenity(e.target.value))}
                            >
                                <MenuItem value="Amenity1">amenity1</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
                
                <button name="Book Campground" className='w-[200px] bg-[#A4B465] text-black font-semibold py-2 px-2 rounded-xl hover:bg-[#626F47]
                hover:text-white hover:border-transparent absolute bottom-5 right-5' onClick={()=>alert("Booked Just Kidding")}>Book</button>
            </div>
            
        </div>
        

    )
        
    
}