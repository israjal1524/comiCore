import CommunityCard from "../components/CommunityCard";

export default function Communities() {

  const communities = [
    {
      id: 1,
      name: "Meme Lords",
      description: "Daily memes and chaotic humor.",
      members: 1200,
      banner:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },
    {
      id: 2,
      name: "Coding Chaos",
      description: "Developers surviving bugs together.",
      members: 980,
      banner:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
    },
    {
      id: 3,
      name: "Cinema Cult",
      description: "Movies, series and fan theories.",
      members: 2100,
      banner:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
    }
  ];

  return (
    <div className="min-h-screen bg-black p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          Communities
        </h1>

        <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-2xl font-semibold">
          Create Community
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
          />
        ))}
      </div>
    </div>
  );
}