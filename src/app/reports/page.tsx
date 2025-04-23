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
    const reports= [
        {
          _id: "r1",
          user: {
            _id: "u1",
            username: "camperjoe",
            tel: "0812345678",
            address: "123 Forest Trail, Chiang Mai"
          },
          rating: 4.5,
          campgroundID: "camp001"
        },
        {
          _id: "r2",
          user: {
            _id: "u2",
            username: "naturelover88",
            tel: "0898765432",
            address: "99 Riverside Rd, Kanchanaburi"
          },
          rating: 5,
          campgroundID: "camp002"
        },
        {
          _id: "r3",
          user: {
            _id: "u3",
            username: "tentmaster",
            tel: "0861122334",
            address: "45 Mountain View, Nan"
          },
          rating: 3.2,
          campgroundID: "camp001"
        },
        {
          _id: "r4",
          user: {
            _id: "u4",
            username: "sunsetdreamer",
            tel: "0839988776",
            address: "78 Beachfront Ave, Phuket"
          },
          rating: 4.8,
          campgroundID: "camp003"
        },
        {
          _id: "r5",
          user: {
            _id: "u5",
            username: "wanderlust99",
            tel: "0823344556",
            address: "22 Jungle Path, Surat Thani"
          },
          rating: 2.9,
          campgroundID: "camp002"
        }
      ];
      

    return(
        <div>
            {reports.map((report) => (
                <div className="p-5 my-2">
                    <Review 
                        id={report._id}
                        name={report.user.username} 
                        comment="forgot to include comments in mockdata DX" 
                        rating={report.rating} 
                        role="admin" />
                </div>
            ))}
            
        </div>

    )
}