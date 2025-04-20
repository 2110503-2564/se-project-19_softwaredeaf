'use client'
import TextField from '@mui/material';
import getCampground from "@/libs/getCampground";
import { CampgroundItem } from "../../../../../../interface";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import editCampground from "@/libs/editCampground";
import deleteCampground from "@/libs/deleteCampground";  // เพิ่มการ import สำหรับ deleteCampground
import { useRouter } from 'next/navigation'

export default function EditCampground({ params }: { params: { cid: string } }) {
  const [campground, setCampground] = useState<CampgroundItem | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [tel, setTel] = useState("");
  const [region, setRegion] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchCamp = async () => {
      const campJson = await getCampground(params.cid);
      setCampground(campJson.data);
      setName(campJson.data.name);
      setAddress(campJson.data.address);
      setDistrict(campJson.data.district);
      setProvince(campJson.data.province);
      setPostalcode(campJson.data.postalcode);
      setTel(campJson.data.tel);
      setRegion(campJson.data.region);
    };
    fetchCamp();
  }, [params.cid]);

  const handleEdit = async () => {
    try {
      if (!session?.user.token) throw new Error("No token");
      await editCampground(session.user.token, params.cid, {
        name,
        address,
        district,
        province,
        postalcode,
        tel,
        region,
      });
      alert("Update success!");
      router.push(`/campground/${params.cid}`);
      router.refresh();
    } catch (err) {
      alert("Error updating campground");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (!session?.user.token) throw new Error("No token");
      await deleteCampground(params.cid,session.user.token);  // เรียกฟังก์ชัน deleteCampground
      alert("Campground deleted successfully!");
      router.push("/campground");  // กลับไปยังหน้าหลักของ campground
      router.refresh();
    } catch (err) {
      alert("Error deleting campground");
      console.error(err);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const [, part1, part2, part3] = match;
      if (part3) {
        return `${part1}-${part2}-${part3}`;
      } else if (part2) {
        return `${part1}-${part2}`;
      } else if (part1) {
        return part1;
      }
    }
    return value;
  };

  return (
    <div className="p-6 text-black w-[80vw]">
      <h1 className="text-2xl font-bold mb-4">Edit Campground</h1>
      {campground ? (
        <form className="flex flex-col gap-3 border border-black p-10 rounded-xl w-[50vw]">
          <div className="text-black text-md font-normal pt-2 grid grid-cols-2">
            <p className="text-black text-md semibold">Campground Name</p>
            <input
              value={name}
              className="bg-[#D9D9D9] border-none p-1 focus:border-[#626F47] rounded-md"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="text-black text-md font-normal pt-2 grid grid-cols-2">
            <p className="text-black text-md semibold">Address</p>
            <input
              value={address}
              className="bg-[#D9D9D9] border-none p-1 focus:border-[#626F47] rounded-md"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <div className="text-black text-md font-normal pt-2 grid grid-cols-2">
            <p className="text-black text-md semibold">District</p>
            <input
              value={district}
              className="bg-[#D9D9D9] border-none p-1 focus:border-[#626F47] rounded-md"
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="District"
            />
          </div>
          <div className="text-black text-md font-normal pt-2 grid grid-cols-2">
            <p className="text-black text-md semibold">Province</p>
            <input
              value={province}
              className="bg-[#D9D9D9] border-none p-1 focus:border-[#626F47] rounded-md"
              onChange={(e) => setProvince(e.target.value)}
              placeholder="Province"
            />
          </div>
          <div className="text-black text-md font-normal pt-2 grid grid-cols-2">
            <p className="text-black text-md semibold">Postal Code</p>
            <input
              value={postalcode}
              className="bg-[#D9D9D9] border-none p-1 focus:border-[#626F47] rounded-md"
              onChange={(e) => setPostalcode(e.target.value)}
              placeholder="Postalcode"
            />
          </div>
          <div className="text-black text-md font-normal pt-2 grid grid-cols-2">
            <p className="text-black text-md semibold">Region</p>
            <input
              value={region}
              className="bg-[#D9D9D9] border-none p-1 focus:border-[#626F47] rounded-md"
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region"
            />
          </div>
          <div className="text-black text-md font-normal pt-2 grid grid-cols-2">
            <p className="text-black text-md semibold">Tel</p>
            <input
              value={tel}
              className="bg-[#D9D9D9] border-none p-1 focus:border-[#626F47] rounded-md"
              onChange={(e) => setTel(formatPhoneNumber(e.target.value))}
              maxLength={12}
              placeholder="Telephone"
            />
          </div>

          <button
            onClick={handleEdit}
            type="button"
            className="bg-[#A4B465] text-white mt-5 px-4 py-2 rounded-xl hover:bg-[#626F47] w-[30%]"
          >
            Save
          </button>

          {/* ปุ่มลบ */}
          <button
            onClick={handleDelete}
            type="button"
            className="bg-red-600 text-white mt-5 px-4 py-2 rounded-xl hover:bg-red-500 w-[30%]"
          >
            Delete Campground
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
