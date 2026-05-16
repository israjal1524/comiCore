"use client";

import { auth, db } from "@/lib/firebase";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import CommunityCard from "@/components/CommunityCard";

import CreateCommunityModal from "@/components/communityModal";

type Community = {
  id: string;
  name: string;
  description: string;
  members: number;
  banner: string;
  createdBy: string;
};

type Post = {
  id: string;
  text: string;
  username: string;
};

export default function CommunitiesPage() {

  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [communities, setCommunities] =
    useState<Community[]>([]);

  // FETCH COMMUNITIES
  const fetchCommunities = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "communities")
      );

      const fetchedCommunities: Community[] =
        [];

      querySnapshot.forEach((doc) => {

        fetchedCommunities.push({
          id: doc.id,
          ...doc.data(),
        } as Community);

      });

      setCommunities(fetchedCommunities);

    } catch (error) {

      console.error(error);

    }
  };

  // AUTH CHECK
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        if (!currentUser) {

          router.push("/login");

        } else {

          setUser(currentUser);

          fetchCommunities();

        }

        setLoading(false);

      }
    );

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

  return (
    <main className="min-h-screen px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">

          <div>

            <h1 className="text-5xl font-bold text-white">
              Communities
            </h1>

            <p className="text-zinc-400 mt-3">
              Private chaos. Members only.
            </p>

          </div>

          {/* BUTTON */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-800 hover:bg-red-700 px-6 py-3 rounded-2xl text-white font-semibold transition"
          >
            Create Community
          </button>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {communities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
            />
          ))}

        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <CreateCommunityModal
          onClose={() => {
            setShowModal(false);

            fetchCommunities();
          }}
        />
      )}

    </main>
  );
}