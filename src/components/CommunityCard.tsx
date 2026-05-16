// src/components/CommunityCard.tsx

type CommunityProps = {
  community: {
    id: number;
    name: string;
    description: string;
    members: number;
    banner: string;
  };
};

export default function CommunityCard({
  community,
}: CommunityProps) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300">

      <img
        src={community.banner}
        alt={community.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold text-white">
          {community.name}
        </h2>

        <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
          {community.description}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-zinc-500 text-sm">
            {community.members} members
          </span>

          <button className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-xl text-white font-semibold transition">
            Join
          </button>

        </div>

      </div>
    </div>
  );
}