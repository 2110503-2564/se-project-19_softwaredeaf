import Image from 'next/image';
import { AmenityItem } from '../../interface';
export default function BookedAmenity({amenityList}:{amenityList:AmenityItem[]}){
    
    return(
        <div className="bg-[#D9D9D9] flex-row overflow-y-auto place-content-around h-full w-full">
            {
                amenityList.length>0 ?

                    amenityList.map((amenityList: AmenityItem, idx) => (
                    <div key={idx} className="h-20 bg-white m-5 shadow flex py-4 pt-4 items-center">
                        <Image
                            src="/img/logo.png"
                            alt="logo"
                            height={300}
                            width={300}
                            className="object-contain h-full w-auto"
                            />
                      {/* Text Content */}
                      <div className="ml-4">
                        <h2 className="font-semibold text-lg">{amenityList.amenityTypeId.name}</h2>
                        <p className="font-normal text-base">{amenityList.price} THB</p>
                      </div>
                    </div>
                  ))
                
                : <p>You haven't booked any amenity</p>
            }
        </div>
    )
}