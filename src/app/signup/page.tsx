"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User created:", userCredential.user);

      alert("Account created successfully!");
    } catch (error: any) {
      console.error(error.message);

      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
        <h1 className="text-4xl font-black mb-2">
          Join Comicore
        </h1>

        <p className="text-zinc-400 mb-8">
          Find your comedy community.
        </p>

        <form className="space-y-5" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-2xl"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-2xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-2xl"
          />

          <button className="w-full bg-white text-black py-3 rounded-2xl font-bold">
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}