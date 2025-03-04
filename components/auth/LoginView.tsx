import { useState } from "react";

export default function LoginView({ switchToSignup }: { switchToSignup: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    console.log("Logging in with:", email, password);
    setError("");
  };

  return (
    <form onSubmit={handleLogin} className="mt-4 flex flex-col space-y-4">
      {error && <p className="text-red-400">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded-md"
      />

      <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md">
        Log In
      </button>

      <p className="text-sm text-gray-400 text-center">
        Don&apos;t have an account?{" "}
        <span onClick={switchToSignup} className="text-gray-300 cursor-pointer hover:underline">
          Sign Up
        </span>
      </p>
    </form>
  );
}
