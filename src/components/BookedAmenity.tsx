import Image from 'next/image';
import dayjs from 'dayjs';
import { AmenityBookingItemFetch } from '../../interface';
export default function BookedAmenity({amenityList}:{amenityList:AmenityBookingItemFetch[]}){
    
    return(
        <div className="bg-[#D9D9D9] flex-row overflow-y-auto place-content-around h-full w-full">
            {
                amenityList.length>0 ?

                    amenityList.map((amenityList: AmenityBookingItemFetch, idx) => (
                    <div key={idx} className="h-20 bg-white m-5 shadow flex py-4 pt-4 items-center">
                        <Image
                            src="/img/logo.png"
                            alt="logo"
                            height={300}
                            width={300}
                            className="object-contain h-full w-auto"
                            />
                      {/* Text Content */}
                      <div className="ml-4 w-[100%]">
                        <h2 className="font-semibold text-lg">{amenityList.campgroundAmenityId.name}</h2>
                        <div className='flex flex-row items-center'>
                            <div className='w-[50%]'>
                                <p className="font-normal text-base">Price : {amenityList.campgroundAmenityId.price} THB/night</p>
                                <p className="font-normal text-base">Amount : {amenityList.amount}</p>
                            </div>
                            <div className='w-[50%] ml-2'>
                                <p className="font-normal text-base">From : {dayjs(amenityList.startDate).format('DD/MM/YYYY').toString()}</p>
                                <p className="font-normal text-base">To : {dayjs(amenityList.endDate).format('DD/MM/YYYY').toString()}</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))
                
                : <p>You haven't booked any amenity</p>
            }
        </div>
    )
}