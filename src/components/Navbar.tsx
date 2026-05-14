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
    <nav className="w-full flex items-center justify-between p-6 border-b border-zinc-800 bg-black">
      <h1 className="text-2xl font-black text-white">
        Comicore
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-black px-5 py-2 rounded-2xl font-bold"
      >
        Logout
      </button>
    </nav>
  );
}