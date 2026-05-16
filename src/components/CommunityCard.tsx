"use client";

import { useRouter } from "next/navigation";

type CommunityProps = {
  community: {
    id: string;
    name: string;
    description: string;
    members: number;
    banner: string;
  };
};

export default function CommunityCard({
  community,
}: CommunityProps) {

  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/communities/${community.id}`)
      }
      className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-700 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
    >

      <img
        src={community.banner}
        alt={community.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            {community.name}
          </h2>

          <div className="w-3 h-3 rounded-full bg-green-500" />

        </div>

        <p className="text-zinc-400 mt-3 leading-relaxed text-sm">
          {community.description}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-zinc-500 text-sm">
            {community.members} members
          </span>

          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-red-800 hover:bg-red-700 px-5 py-2 rounded-xl text-white font-semibold transition-all duration-300"
          >
            Join
          </button>

        </div>

      </div>
    </div>
  );
}