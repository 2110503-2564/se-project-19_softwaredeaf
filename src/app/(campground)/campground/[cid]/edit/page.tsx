'use client'
import TextField from '@mui/material';
import getCampground from "@/libs/getCampground";
import deleteAmenity from '@/libs/deleteAmenity';
import editAmenity from '@/libs/editAmenity';
import { CampgroundItem , AmenityItem ,AmenityJson} from "../../../../../../interface";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import editCampground from "@/libs/editCampground";
import deleteCampground from "@/libs/deleteCampground";  // เพิ่มการ import สำหรับ deleteCampground
import { useRouter } from 'next/navigation'
import { getAmenities } from '@/libs/getAmenities';
import AmenityCard from '@/components/AmenityCard';
import AmenityEditItem from '@/components/AmenityEditItem';

export default function EditCampground({ params }: { params: { cid: string } }) {
  const [campground, setCampground] = useState<CampgroundItem | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [tel, setTel] = useState("");
  const [region, setRegion] = useState("");
  const [campgroundImage,setCampgroundImage]=useState<File>();

  const { data: session } = useSession();
  const router = useRouter();
  const [updating,setUpdating] = useState(false);
  const [updated,setUpdated] = useState(false);

  const [amenities, setAmenities] = useState<AmenityItem[]>([]);
  const [editAmenities, setEditAmenities] = useState<FormData[]>([]);
  const [deleteAmenities, setDeleteAmenities] = useState<AmenityItem[]>([]);

  useEffect(() => {
    const fetchCamp = async () => {
      const campJson = await getCampground(params.cid);
      const amenitiesJson:AmenityJson = await getAmenities(params.cid);
      setAmenities(amenitiesJson.data);
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
    setUpdating(true);
    try {
      const newForm = new FormData();
      newForm.append("name",name);
      newForm.append("address",address);
      newForm.append("district",district);
      newForm.append("province",province);
      newForm.append("postalcode",postalcode);
      newForm.append("tel",tel);
      newForm.append("region",region);
      if(campgroundImage){
        newForm.append("image",campgroundImage);
      }
      if (!session?.user.token) throw new Error("No token");
      await editCampground(session.user.token, params.cid, newForm);

      await Promise.all(
        editAmenities.map(item =>
        editAmenity(session.user.token,item)
        )
      );

      await Promise.all(
        deleteAmenities.map(item =>
        deleteAmenity(session.user.token,item.campgroundId ? item.campgroundId._id : "" ,item._id)
        )
      );
    } catch (err) {
      alert("Error updating campground");
      console.error(err);
    }finally{
      setUpdated(true);
      await new Promise(r => setTimeout(r,2000))
      setUpdating(false);
      router.push(`/campground/${params.cid}`);
      router.refresh();
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

  const amenityEdit = (amenity:FormData) =>{
    if(amenity){
      const existing = editAmenities.findIndex(item => 
          (item.get('id') === amenity.get('id') ))
      if (existing>=0) {
        setEditAmenities((prevList) =>
          prevList.filter(
            (item) => item.get('id') !== editAmenities[existing].get('id')
          )
        );
          setEditAmenities(prev => [...prev, amenity]);
          alert('Update Amenity!');
      }
      else{
        setEditAmenities(prev => [...prev, amenity]);
          alert('Booking Amenity Success!');
      }
  }
  };

  const amenityDelete = (amenity:AmenityItem) =>{
    if(amenity){
      setEditAmenities((prevList) =>
          prevList.filter(
            (item) => item.get('id') !== amenity._id
          )
      );
      setDeleteAmenities(prev => [...prev, amenity]);
      alert(`Delete ${amenity.name}!`);
  }
  };

  return (
    <div>
      {updating ? (
        <div>
          {
            updated ? <div className="flex flex-col items-center justify-center">
            <p className="text-black font-bold mt-12 text-center">
              Update Campground Success!
            </p>
          </div>
          :
            <div className="flex justify-center">
              <p className="text-black font-bold mt-12">
                Updating Campground
                <span className="inline-block w-4 text-left after:content-['...'] after:animate-dots" />
              </p>
            </div>
          }
        </div>
      ) : campground ? (
        <div className="p-6 text-black w-[80vw]">
          <h1 className="text-2xl font-bold mb-4">Edit Campground</h1>
  
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
              <div className="text-black text-md font-normal pt-2 grid grid-cols-2">
              <p>Image</p>
                <div className="border border-black h-10 py-2 px-5 rounded-xl flex flex-row items-center justify-center">
                  <label
                    htmlFor="campgroundImageInput"
                    className="flex flex-row items-center text-center justify-center w-[100%]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                    {campgroundImage ? (
                      <p className="text-base text-black">
                        {campgroundImage.name}
                      </p>
                    ) : (
                      <p className="text-base text-black">เลือกรูปภาพ</p>
                    )}
                  </label>
                  <input
                    id="campgroundImageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setCampgroundImage(
                        e.target.files ? e.target.files[0] : undefined
                      )
                    }
                    style={{ display: "none" }}
                  />
                  {campgroundImage ? (
                    <button
                      onClick={(e) => {
                        setCampgroundImage(undefined);
                        e.stopPropagation();
                      }}
                      className="ml-auto"
                    >
                      <img
                        src="/img/cancel.png"
                        alt="Edit"
                        className="ml-3 w-3 h-3"
                      />
                    </button>
                  ) : null}
                </div>
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
          <div className="mt-8 space-y-4">
            {amenities.map((a) => (
              <AmenityEditItem
                key={a._id}
                amenities={a}
                handleSubmit={amenityEdit}
                handleDelete={amenityDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="font-bold text-xl">Loading…</p>
        </div>
      )}
    </div>
  );  
}
