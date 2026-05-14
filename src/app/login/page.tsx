"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in:", userCredential.user);

      

      router.push("/home");
    } catch (error: any) {
      console.error(error.message);

      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h1 className="text-4xl font-black mb-2">
          Comicore
        </h1>

        <p className="text-zinc-400 mb-8">
          Welcome back to the chaos.
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-2xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-2xl outline-none"
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-2xl font-bold hover:scale-[1.02] transition"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}