import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl font-black mb-4">
          Welcome to Comicore 
        </h1>

        <h3 className="text-zinc-400 text-lg">
          Your comedy community platform is alive.
        </h3>
      </div>
    </main>
  );
}