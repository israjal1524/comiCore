"use client";

import { auth } from "@/lib/firebase";

import { onAuthStateChanged, User } from "firebase/auth";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import CommunityCard from "@/components/CommunityCard";

export default function CommunitiesPage() {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (!currentUser) {

        router.push("/login");

      } else {

        setUser(currentUser);

      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const communities = [
    {
      id: 1,
      name: "Meme Lords",
      description:
        "Daily memes, cursed humor and pure internet chaos.",
      members: 1200,
      banner:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },

    {
      id: 2,
      name: "Coding Chaos",
      description:
        "Developers crying over bugs together.",
      members: 980,
      banner:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },

    {
      id: 3,
      name: "Cinema Cult",
      description:
        "Movies, fan theories and binge addiction.",
      members: 2100,
      banner:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    },
  ];

  return (
    <main className="min-h-screen px-8 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-12">

          <div>

            <h1 className="text-5xl font-bold text-white">
              Communities
            </h1>

            <p className="text-zinc-400 mt-3">
              Private chaos. Members only.
            </p>

          </div>

          <button className="bg-red-800 hover:bg-red-700 px-6 py-3 rounded-2xl text-white font-semibold transition">

            Create Community

          </button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {communities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
            />
          ))}

        </div>

      </div>

    </main>
  );
}