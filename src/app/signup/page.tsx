// src/app/signup/page.tsx

"use client";

import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        !username ||
        !email ||
        !password
      ) {

        alert(
          "Please fill all fields."
        );

        return;
      }

      try {

        setLoading(true);

        // CREATE USER
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        // SAVE USERNAME
        await updateProfile(
          userCredential.user,
          {
            displayName: username,
          }
        );

        // REDIRECT
        router.push("/communities");

      } catch (error) {

        console.error(error);

        alert("Signup failed.");

      } finally {

        setLoading(false);

      }
    };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-950 border border-red-900/40 rounded-3xl p-8">

        {/* TITLE */}
        <h1 className="text-4xl font-black text-white text-center">
          Join Comicore
        </h1>

        <p className="text-zinc-400 text-center mt-3">
          Create your account and enter the chaos.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSignup}
          className="mt-8 flex flex-col gap-5"
        >

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-700"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-700"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-700"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-red-800 hover:bg-red-700 py-4 rounded-2xl text-white font-bold transition disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

      </div>

    </main>
  );
}