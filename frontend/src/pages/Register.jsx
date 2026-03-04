import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      name: e.target.name.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, data, {
        withCredentials: true,
      });
      navigate("/transactions");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center justify-center bg-sage p-6 md:p-10 rounded-2xl text-accent2 font-jetbrains"
      >
        <h1 className="text-xl md:text-2xl font-bold text-black mb-6">Sign Up</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="mb-3 p-3 border-b rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="mb-3 p-3 border-b rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mb-3 p-3 border-b rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-3 p-3 border-b rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          className="button-primary mt-5 hover:bg-orange-600 disabled:opacity-50 w-full max-w-xs py-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <div className="mt-4 text-red-600 text-sm text-center">{error}</div>}
      </form>
    </div>
  );
};

export default Register;
