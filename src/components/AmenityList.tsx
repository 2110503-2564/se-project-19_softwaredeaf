"use client";
import { useState } from "react";
import { AmenityItem } from "../../interface";
import Image from "next/image";

export default function AmenityList({
  amenities,
}: {
  amenities: AmenityItem[];
}) {
  const [isViewAmenity, setViewAmenity] = useState(true);

  const toggleViewAmenity = () => {
    setViewAmenity((prev) => !prev);
  };

  return (
    <div className="mt-5 mb-5">
      <div className="flex flex-row">
        <p className="text-4xl text-black font-semibold py-5">Amenity</p>
        <h2
          className={`text-xl font-semibold cursor-pointer flex items-center ml-4 mt-1 text-black hover:text-gray-200 transition-transform duration-300 ${
            isViewAmenity ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleViewAmenity}
        >
          ▼
        </h2>
      </div>
      <div>
        {isViewAmenity ? (
          <div className="h-[80%] bg-[#F5F5F5] p-3 overflow-y-auto">
            {amenities.length > 0 ? (
              amenities.map((amenity: AmenityItem) => (
                <div className="p-2" key={amenity._id}>
                  <div className="flex flex-row bg-white rounded-lg shadow-md overflow-hidden border border-blue-300">
                    {/* Image */}
                    <div className="w-[180px] h-[150px] relative bg-white border-r-2 border-pink-200">
                      {amenity.image && amenity.image !== "" ? (
                        <Image
                          alt="amenity"
                          src={amenity.image}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          alt="amenity"
                          src="/img/campicdemo.jpg"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between p-4 text-black w-full text-sm leading-relaxed">
                      <div>
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {amenity.name}
                        </p>
                        <p>
                          <span className="font-semibold">Description:</span>{" "}
                          {amenity.description}
                        </p>
                        <p>
                          <span className="font-semibold">Quantity:</span>
                          {amenity.amountbooked} booked out of{" "}
                          {amenity.quantity}
                        </p>
                        <p>
                          <span className="font-semibold">Price:</span>{" "}
                          {amenity.price} THB/night
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`
                                            font-semibold 
                                            ${
                                              amenity.status === "available"
                                                ? "text-[#A4B465]"
                                                : "text-[#C46B65]"
                                            }
                                        `}
                        >
                          {amenity.status === "available"
                            ? "Available"
                            : "Maintenance"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-black text-xl">No amenity Available D: </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
