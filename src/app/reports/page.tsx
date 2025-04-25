'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { mockReviews } from "../mock/mockReviews";
import SearchMenu from "@/components/SearchMenu";
import getReports from "@/libs/getReports";

export default async function reportPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return <div className="text-black">You're not authorized to access this page</div>
  }

  const role: string = session.user.role;
  const token = session.user.token;
  return (
    <div className="w-[100vw] h-[100vh]">
      <SearchMenu />
    </div>

  )
}