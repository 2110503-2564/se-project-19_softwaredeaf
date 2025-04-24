import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import Review from "@/components/Review";

export default async function reportPage(){
    const session=await getServerSession(authOptions);
    if(!session||session.user.role!=='admin'){
        return <div className="text-black">You're not authorized to access this page</div>
    }
    
    const role:string=session.user.role;
    const token=session.user.token;
    // const reports=await getReportedReviews(token);

    //mock data
    const reports=[

    ]

    return(
        <div>
            reports.map((report)=>{
                <div>
                </div>
            }
                
                )
            <Review name="admin test" comment='sofy cooling fresh cucumber edition' rating={0.2} role='admin' />
        </div>

    )
}