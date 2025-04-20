'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import createCampground from "@/libs/createCampground";
import { useRouter } from 'next/navigation';

export default function NewCampground() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [tel, setTel] = useState("");
  const [region, setRegion] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

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

  const handleCreate = async () => {
    try {
      if (!session?.user.token) throw new Error("No token");
      const newCamp = await createCampground(session.user.token, {
        name,
        address,
        district,
        province,
        postalcode,
        tel,
        region,
      });
      alert("Campground created!");
      router.push(`/campground/${newCamp.data._id}`);
    } catch (err) {
      alert("Error creating campground");
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-black w-[80vw]">
      <h1 className="text-2xl font-bold mb-4">Create New Campground</h1>
      <form className="flex flex-col gap-3 border border-black p-10 rounded-xl w-[50vw]">
        <div className="grid grid-cols-2">
          <p>Campground Name</p>
          <input value={name} onChange={(e) => setName(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Name" />
        </div>
        <div className="grid grid-cols-2">
          <p>Address</p>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Address" />
        </div>
        <div className="grid grid-cols-2">
          <p>District</p>
          <input value={district} onChange={(e) => setDistrict(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="District" />
        </div>
        <div className="grid grid-cols-2">
          <p>Province</p>
          <input value={province} onChange={(e) => setProvince(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Province" />
        </div>
        <div className="grid grid-cols-2">
          <p>Postal Code</p>
          <input value={postalcode} onChange={(e) => setPostalcode(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Postalcode" />
        </div>
        <div className="grid grid-cols-2">
          <p>Region</p>
          <input value={region} onChange={(e) => setRegion(e.target.value)} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Region" />
        </div>
        <div className="grid grid-cols-2">
          <p>Tel</p>
          <input value={tel} onChange={(e) => setTel(formatPhoneNumber(e.target.value))} maxLength={12} className="bg-[#D9D9D9] p-1 rounded-md" placeholder="Telephone" />
        </div>
        <button
          type="button"
          onClick={handleCreate}
          className="bg-[#A4B465] text-white mt-5 px-4 py-2 rounded-xl hover:bg-[#626F47] w-[30%]"
        >
          Create
        </button>
      </form>
    </div>
  );
}
