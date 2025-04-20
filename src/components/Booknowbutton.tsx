'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Booknowbutton({ linktext }: { linktext: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session) {
      alert("You need to Sign-In first!")
      router.push("/api/auth/signin");
    } else {
      router.push(`/campground/${linktext}/booking`);
    }
  };

  return (
    <div>
      <button
        name="Book Campground"
        onClick={handleClick}
        className="text-2xl w-[140px] h-[40px] bg-[#C46B65] text-white font-semibold py-1 px-1
                rounded-xl hover:bg-[#830900] hover:text-white hover:border-transparent"
      >
        Book Now
      </button>
    </div>
  );
}
