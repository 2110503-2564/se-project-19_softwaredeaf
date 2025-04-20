"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [userTel, setUserTel] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  enum Role{
    USER = "user",
    OWNER = "owner",
  }
  const [role,setRole] = useState<Role>(Role.USER);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await userRegister(userName, userTel, userEmail, userPassword, role);
      router.push("/signup/success"); 
    } catch (err:any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Register</h1>
      <form onSubmit={handleRegister} className="bg-[#D9D9D9] p-6 rounded-lg shadow-lg w-80 border border-black">
        <div className="mb-4">
          <label className="block text-sm text-black">Username</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-white text-black"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-black">Telephone</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-white text-black"
            value={userTel}
            onChange={(e) => setUserTel(formatPhoneNumber(e.target.value))}
            maxLength={12} 
            required
          />

        </div>
        <div className="mb-4">
          <label className="block text-sm text-black">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-white text-black"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-black">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-white text-black"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-black">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full p-2 rounded bg-white text-black"
          >
            <option value={Role.USER}>User</option>
            <option value={Role.OWNER}>Campground Owner</option>
          </select>
        </div>
        <button className="w-full py-2 text-black  bg-[#A4B465] rounded-lg hover:bg-[#626F47] hover:text-white hover:border-transparent" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
      <p className="mt-4 text-black">
        Already have an account?{" "}
        <a href="/api/auth/signin" className="text-[#A4B465] hover:underline hover:text-[#626F47]">
          Sign in here
        </a>
      </p>
    </div>
  );
}
