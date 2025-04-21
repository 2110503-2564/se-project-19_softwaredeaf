'use client'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';  // ต้องนำเข้า useSession
import deleteCampground from '@/libs/deleteCampground';

export default function DeleteCampgroundButton({ campgroundId }: { campgroundId: string }) {
  const router = useRouter();
  const { data: session } = useSession(); // ตรวจสอบ session ที่ดึงมา

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this campground?");

    if (isConfirmed) {
      try {
        if (!session?.user.token) {
          throw new Error('Token is not available');
        }
        
        await deleteCampground(campgroundId, session.user.token);  // ตรวจสอบ token ว่ามีค่าไหม

        alert("Campground deleted successfully");
        router.push("/campgrounds");
      } catch (error) {
        alert("Error deleting campground");
        console.error(error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="bg-red-600 text-white mt-5 px-4 py-2 rounded-xl hover:bg-red-500 w-[30%]"
    >
      Delete Campground
    </button>
  );
}
