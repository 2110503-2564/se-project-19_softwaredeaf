//DONE
//DONE
//DONE
import Banner from '@/components/Banner';
import CampgroundCatalog from '@/components/CampgroundCatalog';
// import { useEffect, useState } from 'react';
import { CampgroundItem, CampgroundJson } from '../../interface';
import getCampgrounds from '@/libs/getCampgrounds';
import BottomMenu from '@/components/BottomMenu';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';

export default async function Home() {
  let campgrounds:CampgroundJson;
  let loading:boolean = true;
  // const [campgrounds, setCampgrounds] = useState<CampgroundJson | null>(null);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
    // async function fetchData() {
      const session = await getServerSession(authOptions);
      const user=session?.user.token;
      const role=session?.user.role;
      const data:CampgroundJson = await getCampgrounds(user);
        campgrounds=data;
        loading=false;
  return (
    <main>
        <Banner/>
        
        {role === 'user' || !role ? (
        <>
          <div className="font-bold ml-10 mt-3 text-xl text-black">
            Featured campground destinations
          </div>
          <div className="ml-10 text-md text-black">
            Check out these top rated campgrounds
          </div>
        </>
      ) : (
        <>
          <div className="font-bold ml-10 mt-3 text-xl text-black">
            Hello {session.user.name}
          </div>
          <div className="ml-10 text-md text-black">
            You can manage campgrounds and bookings on Top Menu!
          </div>
        </>
      )}

        {loading ? (
        <div>Loading...</div>
      ) : (
        campgrounds && <CampgroundCatalog CampgroundJson={campgrounds} />
      )}
        
        <div className="w-[100%] bottom-0">
          <BottomMenu/>
        </div>
    </main>
  );
}
