
import Banner from '@/components/Banner';
import BottomMenu from '@/components/BottomMenu';
import DummyCampgroundCatalog from '@/components/DummyCampgroundCatalog';
//import { TravelCard } from "@/components/TravelCard";

export default function Home() {
  return (
    <main>
        <Banner/>
        {/* <TravelCard></TravelCard> */}
        <div className="font-bold ml-10 mt-3 text-xl">
          Featured campground destinations
        </div>
        <div className="ml-10 text-md">
          Check out these top rated campgrounds
        </div>
        <DummyCampgroundCatalog/>
        <BottomMenu/>

    </main>
  );
}
