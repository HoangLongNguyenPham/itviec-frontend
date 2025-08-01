import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Gọi API login
      const res = await api.post("/accounts/candidate/login", {
        email,
        password,
      });
      console.log("Login success:", res.data);

      // Lưu token vào localStorage
      localStorage.setItem("token", res.data.token);

      // Gọi API profile để lấy fullName
      const profileRes = await api.get("/candidates/profile-cv", {
        headers: { Authorization: `Bearer ${res.data.token}` }, // thêm token
      });

      const fullName = profileRes.data?.fullName || "Người dùng";
      localStorage.setItem("fullName", fullName);

      setSuccess("Đăng nhập thành công!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
