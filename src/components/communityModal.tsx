"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function CreateCommunityModal({
  onClose,
}: Props) {

  const [communityName, setCommunityName] = useState("");

  const [description, setDescription] = useState("");

  const handleCreateCommunity = () => {

    console.log({
      communityName,
      description,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-full max-w-lg bg-zinc-950 border border-red-900/40 rounded-3xl p-8 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* TITLE */}
        <h1 className="text-3xl font-black text-white">
          Create Community
        </h1>

        <p className="text-zinc-400 mt-2">
          Build your own chaos space.
        </p>

        {/* FORM */}
        <div className="flex flex-col gap-5 mt-8">

          {/* COMMUNITY NAME */}
          <input
            type="text"
            placeholder="Community Name"
            value={communityName}
            onChange={(e) =>
              setCommunityName(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 focus:border-red-700 rounded-2xl px-5 py-4 text-white outline-none"
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Community Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 focus:border-red-700 rounded-2xl px-5 py-4 text-white outline-none resize-none h-32"
          />

          {/* CREATE BUTTON */}
          <button
            onClick={handleCreateCommunity}
            className="bg-red-800 hover:bg-red-700 text-white py-4 rounded-2xl font-bold transition"
          >
            Create Community
          </button>

        </div>

      </div>

    </div>
  );
}