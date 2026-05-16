// src/components/PostCard.tsx

type Props = {
  post: {
    id: string;
    text: string;
  };
};

export default function PostCard({
  post,
}: Props) {

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

      <p className="text-white text-lg leading-relaxed">
        {post.text}
      </p>

    </div>
  );
}