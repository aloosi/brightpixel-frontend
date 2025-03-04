import { useState } from "react";

export default function SignUpView({ switchToLogin }: { switchToLogin: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || password.length < 7) {
      setError("All fields are required. Password must be at least 7 characters.");
      return;
    }
    console.log("Signing up with:", firstName, lastName, email, password);
    setError("");
  };

  return (
    <form onSubmit={handleSignup} className="mt-4 flex flex-col space-y-4">
      {error && <p className="text-red-400">{error}</p>}

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded-md"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded-md"
      />
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
        Sign Up
      </button>

      <p className="text-sm text-gray-400 text-center">
        Already have an account?{" "}
        <span onClick={switchToLogin} className="text-gray-300 cursor-pointer hover:underline">
          Log In
        </span>
      </p>
    </form>
  );
}
