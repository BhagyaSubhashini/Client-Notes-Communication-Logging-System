import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ STORE TOKEN + USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ ROLE BASED REDIRECT
      if (data.user.role === "super_user") {
        navigate("/super-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <div className="text-center mb-6">
        <div className="w-12 h-12 mx-auto bg-indigo-500 rounded-xl flex items-center justify-center text-white text-xl">
          📄
        </div>
        <h1 className="text-2xl font-semibold mt-3">
          Client Notes & Communication Logging System
        </h1>
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            EMAIL
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">PASSWORD</label>
          </div>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div
              className="absolute right-3 top-2.5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-5 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span className="text-indigo-500 cursor-pointer">
            Contact Administrator
          </span>
        </p>
      </form>

      <div className="text-xs text-gray-500 mt-6 space-x-4">
        <span>Privacy Policy</span>
        <span>•</span>
        <span>Security Standards</span>
        <span>•</span>
        <span>Terms of Service</span>
      </div>

    </div>
  );
}

export default Login;