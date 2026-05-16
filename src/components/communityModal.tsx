"use client";

import { useState } from "react";

import { db, auth } from "@/lib/firebase";

import {
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

type Props = {
  onClose: () => void;
};

export default function CreateCommunityModal({
  onClose,
}: Props) {

  const [communityName, setCommunityName] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateCommunity = async () => {

    if (!communityName || !description) return;

    try {

      setLoading(true);

      await addDoc(collection(db, "communities"), {

        name: communityName,

        description: description,

        members: 1,

        banner:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",

        createdBy: auth.currentUser?.uid,

        createdAt: Timestamp.now(),

      });

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-full max-w-lg bg-zinc-950 border border-red-900/40 rounded-3xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-black text-white">
          Create Community
        </h1>

        <p className="text-zinc-400 mt-2">
          Build your own chaos space.
        </p>

        <div className="flex flex-col gap-5 mt-8">

          <input
            type="text"
            placeholder="Community Name"
            value={communityName}
            onChange={(e) =>
              setCommunityName(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 focus:border-red-700 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <textarea
            placeholder="Community Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 focus:border-red-700 rounded-2xl px-5 py-4 text-white outline-none resize-none h-32"
          />

          <button
            onClick={handleCreateCommunity}
            disabled={loading}
            className="bg-red-800 hover:bg-red-700 text-white py-4 rounded-2xl font-bold transition disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Community"}
          </button>

        </div>

      </div>

    </div>
  );
}