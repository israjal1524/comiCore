import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl font-black mb-4">
          Welcome to Comicore 🎤
        </h1>

        <p className="text-zinc-400 text-lg">
          Your comedy community platform is alive.
        </p>
      </div>
    </main>
  );
}