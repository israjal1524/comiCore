// src/components/CreatePost.tsx

"use client";

import { useState } from "react";

import {
  db,
  auth,
} from "@/lib/firebase";

import {
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

type Props = {
  communityId: string;
  refreshPosts: () => void;
};

export default function CreatePost({
  communityId,
  refreshPosts,
}: Props) {

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleCreatePost =
    async () => {

      const trimmedText =
        text.trim();

      if (!trimmedText) {

        alert("Write something.");

        return;
      }

      try {

        setLoading(true);

        await addDoc(
          collection(db, "posts"),
          {

            communityId,

            text: trimmedText,

            createdBy:
              auth.currentUser?.uid,

            username:
              auth.currentUser?.displayName ||
              "anonymous",

            createdAt:
              Timestamp.now(),
          }
        );

        setText("");

        refreshPosts();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to create post."
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="bg-zinc-950 border border-red-900/40 rounded-3xl p-6 mb-10">

      <h2 className="text-2xl font-bold text-white mb-5">
        Create Post
      </h2>

      {/* TEXTAREA */}
      <textarea
        placeholder="What's happening in this chaos?"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white outline-none resize-none h-32"
      />

      {/* BUTTON */}
      <button
        onClick={handleCreatePost}
        disabled={loading}
        className="mt-6 bg-red-800 hover:bg-red-700 px-6 py-3 rounded-2xl text-white font-bold transition disabled:opacity-50"
      >
        {loading
          ? "Posting..."
          : "Create Post"}
      </button>

    </div>
  );
}