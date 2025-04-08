export interface ReservationItem {
  _id:string
  campground:CampgroundItem
  campingDate:string
  nights:number
  user:User
}

export interface CampgroundItem{
  _id: string
  name: string
  address:string
  region:string
  avgRating:number
  picture:string
  tel:string
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

export interface AmenityItem {
  _id: string,
  campgroundId: string, //link to AmenityType
  amenityTypeId: string,
  status: "available" | "booked",
  price: number,
  quantity: number
}