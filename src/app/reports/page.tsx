import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { mockReviews } from "../mock/mockReviews";
import ReviewCard from "@/components/ReviewCard";
import { FaCampground } from "react-icons/fa6";

export default async function reportPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return <div className="text-black">You're not authorized to access this page</div>
  }

  const role: string = session.user.role;
  const token = session.user.token;
  // const reports=await getReportedReviews(token);
  const reports = mockReviews
  return (
    <div>
      <div className="w-[650px] h-20 relative">
        <div className="w-[650px] h-20 left-0 top-0 absolute bg-zinc-300 rounded-[30px]" />
        <div className="w-7 h-7 left-[602px] top-[25px] absolute bg-zinc-800" />
        <div><FaCampground /></div>
      </div>
      <div>
        {
          reports.map((report) => (
            <div className="p-5 my-2" key={report.id}>
              <ReviewCard review={report} role="admin" cancel={true} />
            </div>
          ))
        }
      </div>
    </div>
        
)
}