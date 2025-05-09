export interface ReservationItem {
  bookstatus:boolean
  _id:string
  camp:CampgroundItem
  name:string
  surname:string
  startDate:string
  endDate:string
  user:string
  /*mock*/visited:Boolean
  /*mock*/rating:number
  /*mock*/review:string
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
  avgRating:number,
  reviewCount:number
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

export interface ReviewData {
  success: boolean;
  data: Review[];
}

export interface Review {
  status: {
    reported: boolean;
  };
  report: {
    reason: string;
    otherReasonText: string;
  };
  _id: string;
  userId: string;
  username: string;
  campgroundId: string;
  campgroundName: string;
  rating: number;
  comment: string;
  pictures: string[];
}
