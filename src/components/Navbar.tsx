"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);

    router.push("/login");
  };

  return (
    <nav className="w-full flex items-center justify-between p-6 border-b border-red-900/40 bg-black/40 backdrop-blur-lg">
      
      <h1
        onClick={() => router.push("/home")}
        className="text-3xl font-black text-white cursor-pointer"
      >
        Comicore
      </h1>

      <div className="flex items-center gap-6">
        
        <button
          onClick={() => router.push("/communities")}
          className="text-zinc-300 hover:text-white transition font-semibold"
        >
          Communities
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-800 hover:bg-red-700 text-white px-5 py-2 rounded-2xl font-bold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}