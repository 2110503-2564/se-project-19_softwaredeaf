"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [userTel, setUserTel] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await userRegister(userName, userTel, userEmail, userPassword);
      router.push("/api/auth/signup/success");  // เปลี่ยนเป็นเส้นทางที่เหมาะสมหลังจากสมัครสำเร็จ
    } catch (err:any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#f7f4ed] to-[#ffe6b5] text-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Register</h1>
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <div className="mb-4">
          <label className="block text-sm">Username</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Telephone</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userTel}
            onChange={(e) => setUserTel(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
      <p className="mt-4 text-black">
        Already have an account?{" "}
        <a href="/api/auth/signin" className="text-blue-400 hover:underline">
          Sign in here
        </a>
      </p>
    </div>
  );
}
