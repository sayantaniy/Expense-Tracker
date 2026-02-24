import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const identifier = e.target.identifier.value;
    const password = e.target.password.value;

    try {
      await axios.post(
        "http://localhost:3000/api/auth/login",
        { identifier, password },
        { withCredentials: true }
      );
      navigate("/transactions");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="h-[50%] flex flex-col items-center justify-center bg-sage p-10 rounded-2xl lg:w-[30%] text-accent2 outline-none font-jetbrains"
      >
        <h1 className="text-2xl font-bold text-black mb-4"> User Login</h1>

        {/* ONE FIELD for Username OR Email */}
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          required
          className="mb-2 p-2 border-b rounded w-full max-w-xs"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-2 p-2 border-b rounded w-full max-w-xs"
        />

        <button
          className="button-primary mt-5 hover:bg-orange-600 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
