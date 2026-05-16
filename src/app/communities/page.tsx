// src/app/communities/page.tsx

import CommunityCard from "@/components/CommunityCard";

export default function CommunitiesPage() {

  const communities = [
    {
      id: 1,
      name: "Meme Lords",
      description: "Daily memes, dark humor and chaotic energy.",
      members: 1200,
      banner:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
    {
      id: 2,
      name: "Coding Chaos",
      description: "Developers surviving bugs together.",
      members: 980,
      banner:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
    {
      id: 3,
      name: "Cinema Cult",
      description: "Movies, fan theories and binge sessions.",
      members: 2100,
      banner:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    },
    {
      id: 4,
      name: "Standup Adda",
      description: "For people addicted to standup comedy.",
      members: 760,
      banner:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-8 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <h1 className="text-5xl font-bold text-white">
              Communities
            </h1>

            <p className="text-zinc-400 mt-3">
              Explore people with the same chaos as you.
            </p>
          </div>

          <button className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-2xl text-white font-semibold transition w-fit">
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