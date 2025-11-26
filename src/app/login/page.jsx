"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Note: redirect: false lets us handle errors in client
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError("Invalid email or password"); // show error
    } else {
      // login successful → redirect manually
      window.location.href = "/";
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back!</h1>

        {/* Social Login */}
        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Email & Password Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

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

          <div className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
            <a href="/forgot-password" className="hover:text-blue-500">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
