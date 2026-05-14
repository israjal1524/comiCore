"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in:", userCredential.user);

      setTimeout(() => {
        router.push("/home");
      }, 2200);

    } catch (error: any) {
      console.error(error.message);

      alert(error.message);

      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-transparent text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-black/10 backdrop-blur-md border border-red-900 rounded-3xl p-8 shadow-2xl">
        
        <h1 className="text-4xl font-black mb-2 text-center">
          Comicore
        </h1>

        <p className="text-zinc-400 mb-8 text-center">
          Welcome back to the chaos.
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/60 border border-zinc-700 px-4 py-3 rounded-2xl outline-none focus:border-red-700 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/60 border border-zinc-700 px-4 py-3 rounded-2xl outline-none focus:border-red-700 transition"
          />

          <button
            type="submit"
            className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-2xl font-bold transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}