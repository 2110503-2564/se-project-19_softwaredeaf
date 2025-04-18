import Link from "next/link";
import ProductCard from "./ProductCard";

// ไฟล์นี้เป็น Dummy ซึ่งต้องรอไปเชื่อม database จริง ใช้ CampgroundCatalog.tsx แทน
export default function DummyCampgroundCatalog() {
    const dummyCampgroundJson = {
        count: 3,
        data: [
            {
                _id: "1",
                name: "Sunny Hills Camp",
                picture: "",
                avgRating: 4.5
            },
            {
                _id: "2",
                name: "Forest Retreat",
                picture: "",
                avgRating: 4.0
            },
            {
                _id: "3",
                name: "Mountain Basecamp",
                picture: "",
                avgRating: 5.0
            },
            {
                _id: "4",
                name: "Mountain Basecamp",
                picture: "",
                avgRating: 5.0
            },
            {
                _id: "5",
                name: "Mountain Basecamp",
                picture: "",
                avgRating: 5.0
            }
        ]
    };

    return (
        <>
        <div style={{
            margin: "20px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "space-around"
        }}>
            {
                dummyCampgroundJson.data.map(campgroundItem => (
                    <Link key={campgroundItem._id} href={`/campground/${campgroundItem._id}`} className='w-1/5 m-5'>
                        <ProductCard 
                            campgroundName={campgroundItem.name}
                            imgSrc={campgroundItem.picture}
                            rating={campgroundItem.avgRating}
                        />
                    </Link>
                ))
            }
        </div>
        </>
    );
}
