import Link from "next/link";
import ProductCard from "./ProductCard";
import { CampgroundItem, CampgroundJson } from "../../interface";

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
                            <ProductCard campgroundName={campgroundItem.name} campgroundAddress={campgroundItem.address} campgroundPhone={campgroundItem.tel} imgSrc={"/img/logo.png"} rating={5}
                            />
                            </Link>
                        ))
                    }
                    </div>
        </>
    )
}