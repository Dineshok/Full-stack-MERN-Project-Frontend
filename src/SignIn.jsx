import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  function collectEmail(event) {
    setEmail(event.target.value);
  }

  function collectPassword(event) {
    setPassword(event.target.value);
  }

  function checkUser(event) {
    event.preventDefault();

    Axios.post("https://movie-booking-application-back-end-4ph1.onrender.com/signin", {
      enteredEmail: email,
      enteredPassword: password,
    })
      .then((response) => {
        setMessage(response.data.message);
        setMessageType("success");
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);
          setMessageType("error");
        } else {
          setMessage("Something went wrong");
          setMessageType("error");
        }
      });
  }

  // ✅ Redirect after successful login
  useEffect(() => {
    if (messageType === "success") {
      const timer = setTimeout(() => {
        navigate("/movies");
      }, 1000); // delay for 1 sec so user can see message

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [messageType, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="input-style"
            onChange={collectEmail}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-style"
            onChange={collectPassword}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={checkUser}
          >
            Sign In
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
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
