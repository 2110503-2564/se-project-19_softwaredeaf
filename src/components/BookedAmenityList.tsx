import BookedAmenity from "@/components/BookedAmenity";
import { AmenityItem } from "../../interface";
export default function BookedAmenityList(){
    //mock amenity 
    const amenity:AmenityItem[] =[
        {
          "_id": "68033e03f4a12360e7f5c204",
          "campgroundId": "68025bb266414902e377d383",
          "amenityTypeId": {
            "_id": "68033dd6f4a12360e7f5c1fe",
            "name": "Fire Pit",
            "description": "A cozy fire pit perfect for evening gatherings."
          },
          "status": "available",
          "price": 15,
          "quantity": 3
        },
        {
          "_id": "68033e03f4a12360e7f5c204",
          "campgroundId": "68025bb266414902e377d383",
          "amenityTypeId": {
            "_id": "68033dd6f4a12360e7f5c1fe",
            "name": "BBQ grill",
            "description": "eat bbq lol"
          },
          "status": "booked",
          "price": 5000,
          "quantity": 3
        },
        {
            "_id": "68033e03f4a12360e7f5c204",
            "campgroundId": "68025bb266414902e377d383",
            "amenityTypeId": {
              "_id": "68033dd6f4a12360e7f5c1fe",
              "name": "BBQ grill",
              "description": "eat bbq lol"
            },
            "status": "booked",
            "price": 5000,
            "quantity": 3
          },
          {
            "_id": "68033e03f4a12360e7f5c204",
            "campgroundId": "68025bb266414902e377d383",
            "amenityTypeId": {
              "_id": "68033dd6f4a12360e7f5c1fe",
              "name": "BBQ grill",
              "description": "eat bbq lol"
            },
            "status": "booked",
            "price": 5000,
            "quantity": 3
          },
          {
            "_id": "68033e03f4a12360e7f5c204",
            "campgroundId": "68025bb266414902e377d383",
            "amenityTypeId": {
              "_id": "68033dd6f4a12360e7f5c1fe",
              "name": "BBQ grill",
              "description": "eat bbq lol"
            },
            "status": "booked",
            "price": 5000,
            "quantity": 3
          },
          {
            "_id": "68033e03f4a12360e7f5c204",
            "campgroundId": "68025bb266414902e377d383",
            "amenityTypeId": {
              "_id": "68033dd6f4a12360e7f5c1fe",
              "name": "BBQ grill",
              "description": "eat bbq lol"
            },
            "status": "booked",
            "price": 5000,
            "quantity": 3
          }
      ];
    return(
        <div className="text-black text-xl bg-[#D9D9D9] h-full">
            <BookedAmenity amenityList={amenity}/>
        </div>
    )
}