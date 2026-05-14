export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
        <h1 className="text-4xl font-black mb-2">
          Join ComiCore.
        </h1>

        <p className="text-zinc-400 mb-8">
          Find your comedy community.
        </p>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-2xl"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-2xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black border border-zinc-700 px-4 py-3 rounded-2xl"
          />

          <button className="w-full bg-white text-black py-3 rounded-2xl font-bold">
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}