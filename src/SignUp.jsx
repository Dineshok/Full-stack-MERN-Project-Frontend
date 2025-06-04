import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  function sendNewUser(e) {
    e.preventDefault(); // Prevent page reload

    if (password === reEnteredPassword) {
      Axios.post("https://movie-booking-application-back-end-4ph1.onrender.com/signup", {
        myname: name,
        myemail: email,
        mypassword: password,
      })
        .then((response) => {
          setMessage(response.data.message);
          setMessageType("success");
        })
        .catch((err) => {
          if (err.response) {
            setMessage(err.response.data.message);
            setMessageType("error");
          } else {
            setMessage("Something Went Wrong");
            setMessageType("error");
          }
        });
    } else {
      setMessage("Password does not match");
      setMessageType("error");
    }
  }

  // ✅ Redirect after success message
  useEffect(() => {
    if (messageType === "success") {
      const timer = setTimeout(() => {
        navigate("/signin");
      }, 1000); // 1 sec delay to let user read success message

      return () => clearTimeout(timer);
    }
  }, [messageType, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            className="input-style"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-style"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-style"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-style"
            onChange={(e) => setReEnteredPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={sendNewUser}
          >
            Create Account
          </button>
          {message && (
            <p
              className={`text-sm mt-2 text-center ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
