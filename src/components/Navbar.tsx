"use client";

import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

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

        {loading ? null : !user ? (
          <>
            {/* LOGIN */}
            <button
              onClick={() => router.push("/login")}
              className="text-zinc-300 hover:text-white transition font-semibold"
            >
              Login
            </button>

            {/* SIGNUP */}
            <button
              onClick={() => router.push("/signup")}
              className="bg-red-800 hover:bg-red-700 text-white px-5 py-2 rounded-2xl font-bold transition"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            {/* COMMUNITIES */}
            <button
              onClick={() => router.push("/communities")}
              className="text-zinc-300 hover:text-white transition font-semibold"
            >
              Communities
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-800 hover:bg-red-700 text-white px-5 py-2 rounded-2xl font-bold transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}