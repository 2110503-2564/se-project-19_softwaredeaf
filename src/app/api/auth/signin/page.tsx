"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/api/auth/signin/success");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#f7f4ed] to-[#ffe6b5] text-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          Sign In
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
      <p className="mt-4 text-black">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-400 hover:underline">
          Sign up here
        </a>
      </p>
    </div>
  );
}
