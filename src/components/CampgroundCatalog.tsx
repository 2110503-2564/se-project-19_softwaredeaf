import Link from "next/link";
import ProductCard from "./ProductCard";
import { CampgroundItem, CampgroundJson } from "../../interface";

export default async function CampgroundCatalog({CampgroundJson}:{CampgroundJson:CampgroundJson}) {
    const campgroundJsonReady = await CampgroundJson
    return(
        <>
        <div className="grid grid-cols-4 ">
                    {   
                        campgroundJsonReady.data.map((campgroundItem:CampgroundItem)=>(
                            <Link key={campgroundItem._id} href={`/campground/${campgroundItem._id}`} className=' m-5'>
                            <ProductCard campground={campgroundItem}
                            />
                            </Link>
                        ))
                    }
                    </div>
        </>
    )
}