import { CampgroundItem, CampgroundJson } from '../../../interface';
import getServerSession from 'next-auth';
import getCampgrounds from '@/libs/getCampgrounds';
import BottomMenu from '@/components/BottomMenu';
import { authOptions } from '@/app/utils/authOptions';

export default async function myCampground(){
    let campgrounds:CampgroundJson;
    let loading:boolean = true;
    const session = await getServerSession(authOptions);
    const user=session?.user.token;
    const role=session?.user.role;
    if(!role || role==='user') return (
    <div className="text-black text-2xl">
        unauthorize to access this page.
    </div>
    )
    const data:CampgroundJson = await getCampgrounds(user);
    campgrounds=data;
    loading=false;
    return (
    <div>
        
    </div>
    )
}