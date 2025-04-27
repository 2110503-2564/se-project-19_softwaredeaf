// DONE
import getCampground from "@/libs/getCampground";
import { getAmenities } from "@/libs/getAmenities";
import {getCampgroundReviews} from "@/libs/getCampgroundReviews";
import Image from "next/image";
import {
  CampgroundItem,
  AmenityJson,
  AmenityItem,
  ReservationItem,
  BookingJson
} from "../../../../../interface";
import { Review } from "../../../../../interface";
import Booknowbutton from "@/components/Booknowbutton";
import ReviewList from "@/components/ReviewList";
import { mockReviews } from "@/app/mock/mockReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import AmenityList from "@/components/AmenityList";
import getBooking from "@/libs/getBooking";
import BookingCampgroundList from "@/components/BookingCampList";

const cleanURL = (url: string) => {
  return url
    .replace(/\s/g, "") // remove all spaces and newlines
    .replace(/&amp;/g, "&"); // in case it got HTML encoded
};

export default async function campground({
  params,
}: {
  params: { cid: string };
}) {
  const session = await getServerSession(authOptions);
  const userRole = session?.user.role;

  const campgroundJson = await getCampground(params.cid);
  const campground: CampgroundItem = campgroundJson.data;

  const amenityJson: AmenityJson = await getAmenities(params.cid);
  const amenity: AmenityItem[] = amenityJson.data;

  let campBookingJson:BookingJson ;
  let campBookings:ReservationItem[] =[];
  if(session?.user.token){
    campBookingJson= await getBooking(session.user.token,`?campId=${params.cid}`);
    campBookings=campBookingJson.data
    console.log("campBookingJson = ", campBookingJson);
  }
  

  

  const reviewDataJson = await getCampgroundReviews(params.cid);
  const reviewData:Review[] = reviewDataJson.data;


  return (
    <div className="px-20">
      <p className="py-5 text-5xl text-black font-bold">{campground.name}</p>
      <div className="grid grid-cols-3 grid-rows-5 bg-white p-5 w-full h-auto">
        <div className="col-span-1 row-span-full text-black flex justify-center">
          <Image
            alt="campground"
            src={campground.picture}
            height={1080}
            width={1920}
            className="w-[40%] h-auto w-auto rounded-xl"
          ></Image>
        </div>
        <div className="flex flex-col space-y-2 column-auto row-span-full col-span-2 rounded-tr-xl rounded-br-xl pl-10 ">
          {/* <div className="row-span-5 text-black bg-red-200"> */}
          <div className="flex flex-row row-span-1 col-span-2 rounded-tr-xl">
            <p className="text-black text-xl font-semibold min-w-[100px]">
              Name:{" "}
            </p>
            <p className="text-black text-xl font-semibold">
              {campground.name}
            </p>
          </div>
          <div className="flex flex-row row-span-2 col-span-2">
            <p className="row-span-1 col-span-1 text-black text-xl font-semibold min-w-[100px]">
              Address:{" "}
            </p>
            <p className="col-span-1 text-black text-xl font-semibold">
              {campground.address}, {campground.district}, {campground.province}
              , {campground.postalcode}
            </p>
          </div>
          <div className="flex flex-row row-span-1 col-span-2">
            <p className="text-black text-xl font-semibold min-w-[100px]">
              Tel:{" "}
            </p>
            <p className="text-black text-xl font-semibold">{campground.tel}</p>
          </div>
          <div className="flex flex-row row-span-1 col-span-2">
            <p className="text-black text-xl font-semibold min-w-[100px]">
              Region:{" "}
            </p>
            <p className="text-black text-xl font-semibold">
              {campground.region}
            </p>
          </div>
          <div className="flex flex-row row-span-1 col-span-2 text-[#FFB900]">
            <p className=" text-xl font-semibold min-w-[100px]">Rating: </p>
            <p className="text-xl font-semibold">{campground.avgRating} ( {campground.reviewCount} Reviews )</p>
          </div>
        </div>
      </div>
      <div className="my-10">
        <Booknowbutton linktext={params.cid} />
      </div>
      <ReviewList reviews={reviewData} role={userRole} />
      <AmenityList amenities={amenity} />
      {
        (session?.user.role == 'owner') && campBookings ?
        <BookingCampgroundList bookings={campBookings} token={session?.user.token}/>
        : null
      }

    </div>
  );
}
