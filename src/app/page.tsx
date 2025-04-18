
import Banner from '@/components/Banner';
import CampgroundCatalog from '@/components/CampgroundCatalog';
// import { useEffect, useState } from 'react';
import { CampgroundItem, CampgroundJson } from '../../interface';
import getCampgrounds from '@/libs/getCampgrounds';
//import { TravelCard } from "@/components/TravelCard";

export default async function Home() {
  let campgrounds:CampgroundJson;
  let loading:boolean = true;
  // const [campgrounds, setCampgrounds] = useState<CampgroundJson | null>(null);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
    // async function fetchData() {
        const data:CampgroundJson = await getCampgrounds();
        campgrounds=data;
        loading=false;
    // }
    // fetchData();
// }, []);
  return (
    <main>
        <Banner/>
        {/* <TravelCard></TravelCard> */}
        <div className="font-bold ml-10 mt-3 text-xl text-black">
          Featured campground destinations
        </div>
        <div className="ml-10 text-md text-black">
          Check out these top rated campgrounds
        </div>
        {loading ? (
        <div>Loading...</div>
      ) : (
        campgrounds && <CampgroundCatalog CampgroundJson={campgrounds} />
      )}
        

    </main>
  );
}
