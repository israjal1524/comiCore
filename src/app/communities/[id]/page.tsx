"use client";

import { db, auth } from "@/lib/firebase";

import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import CreatePost from "@/components/CreatePost";

import PostCard from "@/components/PostCard";

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
  imageUrl: string;
};

export default function CommunityPage() {

  const params = useParams();

  const router = useRouter();

  const [community, setCommunity] =
    useState<Community | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  const [posts, setPosts] =
    useState<Post[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH COMMUNITY
  const fetchCommunity = async () => {

    try {

      const docRef = doc(
        db,
        "communities",
        params.id as string
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setCommunity({
          id: docSnap.id,
          ...docSnap.data(),
        } as Community);

      }

    } catch (error) {

      console.error(error);

    }
  };

  // FETCH POSTS
  const fetchPosts = async () => {

    try {

      const q = query(
        collection(db, "posts"),
        where(
          "communityId",
          "==",
          params.id
        ),
        orderBy("createdAt", "desc")
      );

      const querySnapshot =
        await getDocs(q);

      const fetchedPosts: Post[] = [];

      querySnapshot.forEach((doc) => {

        fetchedPosts.push({
          id: doc.id,
          ...doc.data(),
        } as Post);

      });

      setPosts(fetchedPosts);

    } catch (error) {

      console.error(error);

    }
  };

  // DELETE COMMUNITY
  const handleDeleteCommunity =
    async () => {

      if (!community) return;

      try {

        await deleteDoc(
          doc(db, "communities", community.id)
        );

        router.push("/communities");

      } catch (error) {

        console.error(error);

      }
    };

  // AUTH CHECK
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          if (!currentUser) {

            router.push("/login");

          } else {

            setUser(currentUser);

            fetchCommunity();

            fetchPosts();

          }

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Community not found
      </div>
    );
  }

  return (
    <main className="min-h-screen">

      {/* BANNER */}
      <div className="relative w-full h-[320px]">

        <img
          src={community.banner}
          alt={community.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">

          <div>

            <h1 className="text-5xl font-black text-white">
              {community.name}
            </h1>

            <p className="text-zinc-400 mt-4 text-lg">
              {community.description}
            </p>

            <p className="text-zinc-500 mt-6">
              {community.members} members
            </p>

          </div>

          {/* DELETE BUTTON */}
          {user?.uid ===
            community.createdBy && (
            <button
              onClick={
                handleDeleteCommunity
              }
              className="bg-red-900 hover:bg-red-800 px-6 py-3 rounded-2xl text-white font-bold transition"
            >
              Delete Community
            </button>
          )}

        </div>

        {/* CREATE POST */}
        <CreatePost
          communityId={community.id}
          refreshPosts={fetchPosts}
        />

        {/* POSTS */}
        <div className="flex flex-col gap-6">

          {posts.length === 0 ? (
            <div className="text-zinc-500 text-center py-10">
              No posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          )}

        </div>

      </div>

    </main>
  );
}