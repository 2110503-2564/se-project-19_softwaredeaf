interface AmenityType {
  _id: string,
  name: string,
  description: string
}

interface AmenityItem {
  _id: string,
  campgroundId: string, //link to AmenityType
  amenityTypeId: string,
  status: "available" | "booked",
  price: number,
  quantity: number
}