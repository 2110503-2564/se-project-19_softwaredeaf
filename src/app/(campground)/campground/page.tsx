import { CampgroundItem,CampgroundJson } from '../../../../interface';
import CampgroundCatalog from '@/components/CampgroundCatalog';
import getCampgrounds from '@/libs/getCampgrounds';

export default async function campgroundPage(){
    let campgrounds:CampgroundJson;
    let loading:boolean = true;
    const data:CampgroundJson = await getCampgrounds();
    campgrounds=data;
    loading=false;
    return(
        <div className='p-10'>
           {loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <div className="text-black text-2xl flex justify-center font-bold">Campground List</div>
                  {campgrounds && <CampgroundCatalog CampgroundJson={campgrounds} />}
                </div>
                
              )} 
        </div>
        
    )
}