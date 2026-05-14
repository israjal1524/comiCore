type Props = {
  name: string;
  description: string;
  members: string;
};

export default function CommunityCard({
  name,
  description,
  members,
}: Props) {
  return (
    <div className="bg-black/60 backdrop-blur-lg border border-red-900 rounded-3xl p-6 hover:scale-[1.02] transition duration-300 shadow-xl">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black text-white">
          {name}
        </h2>

        <span className="text-xs bg-red-900/60 px-3 py-1 rounded-full text-zinc-300">
          {members}
        </span>
      </div>

      <p className="text-zinc-400 mb-6 leading-relaxed">
        {description}
      </p>

      <button className="w-full bg-red-800 hover:bg-red-700 text-white py-3 rounded-2xl font-bold transition">
        Join Community
      </button>
    </div>
  );
}