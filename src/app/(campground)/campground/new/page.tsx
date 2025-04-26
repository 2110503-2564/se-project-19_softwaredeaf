"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import createCampground from "@/libs/createCampground";
import { useRouter } from "next/navigation";
import AmenityCard from "@/components/AmenityCard";
import { TextField } from "@mui/material";
import createAmenity from "@/libs/createAmenity";

export default function NewCampground() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [tel, setTel] = useState("");
  const [region, setRegion] = useState("");
  const [amenities, setAmenities] = useState<FormData[]>([]);
  const [campgroundImage, setCampgroundImage] = useState<File>();

  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const [amenityName, setAmenityName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [amenityImage, setAmenityImage] = useState<File>();

  let newCampId: string;

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
      setLoading(true);
      if (!session?.user.token) throw new Error("No token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("district", district);
      formData.append("province", province);
      formData.append("postalcode", postalcode);
      formData.append("tel", tel);
      formData.append("region", region);
      if (campgroundImage) {
        formData.append("image", campgroundImage);
      }
      const newCamp = await createCampground(session.user.token, formData);

      newCampId = newCamp.data._id;

      await Promise.all(
        amenities.map((item) =>
          createAmenity(item, newCamp.data._id, session.user.token)
        )
      );
    } catch (err) {
      alert("Error creating campground");
      console.error(err);
    } finally {
      setCreated(true);
      await new Promise((r) => setTimeout(r, 2000));
      router.push(`/campground/${newCampId}`);
    }
  };

  const handleAddAmenity = () => {
    if (amenityName && description && quantity && price) {
      const formData = new FormData();
      formData.append("name", amenityName);
      formData.append("description", description);
      formData.append("quantity", quantity.toString());
      formData.append("price", price.toString());
      if (amenityImage) {
        formData.append("image", amenityImage);
      }
      setAmenities((prev) => [...prev, formData]);
      setAmenityName("");
      setDescription("");
      setImage("");
      setQuantity(0);
      setPrice(0);
      setAmenityImage(undefined);
      alert("Added Amenity!");
    }
    else if(!amenityName){
      alert("Please fill Amenity Name");
    }
    else if(!description){
      alert("Please fill amenity description");
    }
    else if(quantity ==0){
      alert("Please fill amenity amount")
    }
    else if(price ==0){
      alert("Please fill amenity price")
    }
  };

  const handleDelete = (deleteAmenity: FormData) => {
    if (deleteAmenity) {
      setAmenities((prevList) =>
        prevList.filter((item) => item.get(name) !== deleteAmenity.get(name))
      );
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          {created ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-black font-bold mt-12 text-center">
                Create Campground Success
              </p>
              <p className="text-black font-bold mt-2 text-center">
                Navigate to {name} Campground
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="text-black font-bold mt-12">
                Creating Campground
                <span className="inline-block w-4 text-left after:content-['...'] after:animate-dots" />
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-10 text-black w-[80vw]">
          <h1 className="text-2xl font-bold mb-4">Create New Campground</h1>
          <form className="flex flex-col gap-3 border border-black p-10 rounded-xl w-[50vw]">
            <div className="grid grid-cols-2">
              <p>Campground Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#D9D9D9] p-1 rounded-md"
                placeholder="Name"
              />
            </div>
            <div className="grid grid-cols-2">
              <p>Address</p>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-[#D9D9D9] p-1 rounded-md"
                placeholder="Address"
              />
            </div>
            <div className="grid grid-cols-2">
              <p>District</p>
              <input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-[#D9D9D9] p-1 rounded-md"
                placeholder="District"
              />
            </div>
            <div className="grid grid-cols-2">
              <p>Province</p>
              <input
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="bg-[#D9D9D9] p-1 rounded-md"
                placeholder="Province"
              />
            </div>
            <div className="grid grid-cols-2">
              <p>Postal Code</p>
              <input
                value={postalcode}
                onChange={(e) => setPostalcode(e.target.value)}
                className="bg-[#D9D9D9] p-1 rounded-md"
                placeholder="Postalcode"
              />
            </div>
            <div className="grid grid-cols-2">
              <p>Region</p>
              <input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-[#D9D9D9] p-1 rounded-md"
                placeholder="Region"
              />
            </div>
            <div className="grid grid-cols-2">
              <p>Tel</p>
              <input
                value={tel}
                onChange={(e) => setTel(formatPhoneNumber(e.target.value))}
                maxLength={12}
                className="bg-[#D9D9D9] p-1 rounded-md"
                placeholder="Telephone"
              />
            </div>
            <div className="grid grid-cols-2">
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
              type="button"
              onClick={handleCreate}
              className="bg-[#A4B465] text-white mt-5 px-4 py-2 rounded-xl hover:bg-[#626F47] w-[30%]"
            >
              Create
            </button>
          </form>

          <div>
            <div className="flex flex-row">
              <p className="text-xl text-black text-base font-normal m-5">
                Create Amenity
              </p>
              {/* <button
            type="button"
            onClick={()=>handleAddAmenity}
            className="bg-[#A4B465] text-black mt-5 px-4 py-2 rounded-xl hover:bg-[#626F47] absolute right-10"
            >Add Amenity</button> */}
            </div>
            <div className="border border-black py-5 px-10 rounded-xl">
              <div className="text-black text-lg">
                <div className="gap-5">
                  <div className="flex flex-row items-center mb-10">
                    <p className="w-[120px]">Name : </p>
                    <div className="w-[300px] ml-2 flex items-center">
                      <TextField
                        className="w-[300px]"
                        size="small"
                        id="outlined-basic"
                        label="AmenityName"
                        value={amenityName}
                        onChange={(e) => {
                          setAmenityName(e.target.value);
                        }}
                        variant="outlined"
                      />
                    </div>
                    <p className="w-[220px] ml-5">Description : </p>
                    <div className="ml-2 flex items-center w-full">
                      <TextField
                        className="w-full"
                        size="small"
                        id="outlined-basic"
                        label="Description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <div className="relative flex flex-row items-center">
                    <p>Image :</p>
                    <div className="border border-black ml-2 py-2 px-5 rounded-xl flex flex-row items-center">
                      <label
                        htmlFor="amenityImageInput"
                        className="flex flex-row items-center"
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
                        {amenityImage ? (
                          <p className="text-base text-black">
                            {amenityImage.name}
                          </p>
                        ) : (
                          <p className="text-base text-black">เลือกรูปภาพ</p>
                        )}
                      </label>
                      <input
                        id="amenityImageInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setAmenityImage(
                            e.target.files ? e.target.files[0] : undefined
                          )
                        }
                        style={{ display: "none" }}
                      />
                        {amenityImage ? (
                        <button
                          onClick={(e) => {
                            setAmenityImage(undefined);
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
                    <p className="ml-5">Amount : </p>
                    <input
                      type="number"
                      min="0"
                      className="w-[100px] ml-2 h-10 rounded-md border text-center"
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      value={quantity}
                    />
                    <p className="ml-5">Price : </p>
                    <input
                      type="number"
                      min="0"
                      className="w-[150px] ml-2 h-10 rounded-md border text-center"
                      onChange={(e) => setPrice(Number(e.target.value))}
                      value={price}
                    />
                    <div className="flex absolute right-0">
                      <button
                        name="Submit Amenity"
                        className="py-2 text-base bg-[#A4B465] text-black font-normal py-2 px-2 rounded-xl hover:bg-[#626F47]
                              hover:text-white hover:border-transparent"
                        onClick={() => handleAddAmenity()}
                      >
                        Add Amenity
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="ml-5 my-3"> Amenities </p>
          {amenities.map((amenity) => (
            <AmenityCard amenities={amenity} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
