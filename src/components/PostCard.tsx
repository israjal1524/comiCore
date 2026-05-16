// src/components/PostCard.tsx

type Props = {
  post: {
    id: string;
    text: string;
    username: string;
  };
};

export default function PostCard({
  post,
}: Props) {

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

      {/* USERNAME */}
      <h3 className="text-red-500 font-bold text-sm mb-4">
        @{post.username || "anonymous"}
      </h3>

      {/* POST */}
      <p className="text-white text-lg leading-relaxed">
        {post.text}
      </p>

    </div>
  );
}