//Done
import { CampgroundJson } from '../../../../interface';
import CampgroundCatalog from '@/components/CampgroundCatalog';
import getCampgrounds from '@/libs/getCampgrounds';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';
import Link from 'next/link';

export default async function campgroundPage(){
    let campgrounds:CampgroundJson;
    let loading:boolean = true;
    const session = await getServerSession(authOptions);
    const user=session?.user.token;
    const data:CampgroundJson = await getCampgrounds(user);
    campgrounds=data;
    loading=false;
    return(
        <div className='p-10'>
           {loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  
                  <div className="text-black text-2xl flex flex-col items-center justify-center font-bold">
                    <div>Campground List</div>
                    
                    {(session?.user.role === 'owner' || session?.user.role === 'admin') && (
                      <div className='mt-5'>
                      <Link href="/campground/new">
                        <button
                          name="Add Campgrounds"
                          className="text-2xl w-[180px] h-[45px] bg-[#A4B465] text-black text-sm font-semibold py-2 px-4
                          rounded-xl hover:bg-[#626F47] hover:text-white hover:border-transparent transition-all duration-300 ease-in-out"
                        >
                          Add Campground
                        </button>
                      </Link>
                      </div>
                    )}

                    
                  </div>
                  {campgrounds && <CampgroundCatalog CampgroundJson={campgrounds} />}
                </div>
                
              )} 
        </div>
        
    )
}