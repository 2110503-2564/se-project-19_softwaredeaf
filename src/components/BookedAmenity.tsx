import Image from "next/image";
import dayjs from "dayjs";
import { AmenityBookingItemFetch } from "../../interface";
export default function BookedAmenity({
  amenityList,
}: {
  amenityList: AmenityBookingItemFetch[];
}) {
  return (
    <div className="overflow-y-auto place-content-around h-full w-full">
      {amenityList.length > 0 ? (
        amenityList.map((amenityList: AmenityBookingItemFetch, idx) => (
          <div
            key={idx}
            className="h-[40%] w-[95%] bg-white m-2 shadow flex py-4 pt-4 items-center"
          >
            {amenityList.campgroundAmenityId.image && amenityList.campgroundAmenityId.image.startsWith("http") && (
            <Image
              src={amenityList.campgroundAmenityId.image}
              alt="amenity picture"
              height={300}
              width={300}
              className="object-contain h-full w-[30%]"
            />)
          }
            {/* Text Content */}
            <div className="ml-4 w-[100%]">
              <h2 className="font-semibold text-md ">
                {amenityList.campgroundAmenityId.name}
              </h2>
              <div className="flex flex-row items-center">
                <div className="w-[50%] ">
                  <p className="font-normal text-sm">
                    Price : {amenityList.campgroundAmenityId.price} THB
                  </p>
                  <p className="font-normal text-sm">
                    Amount : {amenityList.amount}
                  </p>
                </div>
                <div className="w-[50%] ml-2">
                  <p className="font-normal text-xs">
                    From :{" "}
                    {dayjs(amenityList.startDate)
                      .format("DD/MM/YYYY")
                      .toString()}
                  </p>
                  <p className="font-normal text-xs">
                    To :{" "}
                    {dayjs(amenityList.endDate).format("DD/MM/YYYY").toString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-full w-full flex flex-row items-center justify-center">
          <p className="">No Amenity Booked</p>
        </div>
      )}
    </div>
  );
}
