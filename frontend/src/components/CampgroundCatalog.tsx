import Link from "next/link";
import ProductCard from "./ProductCard";
import { CampgroundItem, CampgroundJson } from "../../interfaces";

export default async function CampgroundCatalog({CampgroundJson}:{CampgroundJson:CampgroundJson}) {
    const campgroundJsonReady = await CampgroundJson
    return(
        <>
        Explore {campgroundJsonReady.count} Campgrounds in List
        <div style={{margin:"20px" ,display:"flex",flexDirection:"row",
                  flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"
                }}>
                    {   
                        campgroundJsonReady.data.map((campgroundItem:CampgroundItem)=>(
                            <Link key={campgroundItem._id} href={`/campground/${campgroundItem._id}`} className='w-1/5 m-5'>
                            <ProductCard campgroundName={campgroundItem.name} imgSrc={campgroundItem.picture} rating={campgroundItem.avgRating}
                            />
                            </Link>
                        ))
                    }
                    </div>
        </>
    )
}