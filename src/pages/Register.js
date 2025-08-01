import { useState } from "react";
import api from "../api";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/accounts/candidate/register", {
        fullName: fullname,
        email,
        password,
      });
      console.log(res.data);
      setSuccess("Đăng ký thành công! Bạn có thể đăng nhập.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
              placeholder="Nhập tên của bạn"
              required
            />
          </div>

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

          {/* Error / Success */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>

        {/* ✅ Link sang nhà tuyển dụng */}
        <p className="mt-6 text-center text-gray-600">
          Bạn là nhà tuyển dụng?{" "}
          <a
            href="http://localhost:5000/api/v1/accounts/recruiter/register"
            className="text-red-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Đăng ký tại đây
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
