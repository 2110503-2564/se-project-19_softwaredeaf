export interface ReservationItem {
  _id:string
  camp:CampgroundItem
  name:string
  surname:string
  startDate:string
  endDate:string
  user:string
  visited:Boolean
}

export interface AmenityBookingItemFetch {
  _id:string
  campgroundBookingId:ReservationItem
  userId:User
  campgroundAmenityId:AmenityItem
  amount:number
  startDate:string
  endDate:string
  createdAt:string
}

export interface AmenityBookingJson {
  count : number
  data : AmenityBookingItemFetch[]
}

export interface CampgroundItem{
  _id: string
  name: string
  address:string
  district:string
  province:string
  postalcode:string
  tel:string
  region:string
  picture:string
}

export interface CampgroundJson {
  count : number
  data : CampgroundItem[]
}

export interface BookingJson {
  count : number
  data : ReservationItem[]
}

export interface Rating {
  user: string;
  rating: number;
  comment: string;
  _id: string;
  id: string;
};

export interface CampgroundItemAdmin {
  id: string;
  name: string;
  address: string;
  tel: string;
  avgRating: number;
  ratings: Rating[];
  picture: string;
  createdAt: string;
};

export interface User {
  _id: string;  
  name: string;
  email: string;
}

export interface AmenityType {
  _id: string,
  name: string,
  description: string
}

// export interface AmenityItem {
//   _id: string,
//   campgroundId: string, 
//   amenityTypeId: AmenityType, //link to AmenityType
//   status: "available" | "booked",
//   price: number,
//   quantity: number
// }

export interface AmenityItem {
  campgroundId: CampgroundItem | null, 
  _id: string,
  name: string,
  description: string,
  image:string,
  quantity: number,
  amountbooked: number,
  status: string,
  price: number,
}

export interface AmenityBooking {
  _id:string
  campgroundId: string, 
  amenityTypeId: AmenityType,
  quantity: number,
  startDate: string,
  endDate: string
}

export interface AmenityJson {
  count : number
  data : AmenityItem[]
}