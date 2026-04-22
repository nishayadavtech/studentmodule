import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { apiUrl } from "./api";
import { saveStudentSession } from "./studentDataStorage";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(apiUrl("/student/signup"), {
        name,
        email,
        password,
      });

      const loginRes = await axios.post(apiUrl("/student/login"), {
        email,
        password,
      });

      const student = saveStudentSession(loginRes.data);

      if (!student?.student_id) {
        throw new Error("Student profile data missing after signup.");
      }

      localStorage.removeItem("postLoginRedirectPath");
      window.dispatchEvent(new Event("cart-updated"));
      window.dispatchEvent(new Event("purchase-updated"));
      alert("Signup Successful");
      navigate("/");
    } catch (err) {
      console.log(err.response);
      alert(
        err.response?.data?.message ||
        err.message ||
        "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Student Signup</h2>

        <p className="text-center text-gray-500 mb-6">Create your account</p>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 mb-4 rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 mb-4 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 mb-6 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          Create Account
        </button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
