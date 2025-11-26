"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";   // ✅ router import
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();   // ✅ router instance

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        // alert("User created! You can login now.");
        router.push("/");   // ✅ redirect to home page
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        {/* Google Signup */}
        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <FcGoogle size={20} /> Sign up with Google
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
