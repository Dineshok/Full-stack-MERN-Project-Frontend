import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-900 text-white"
      : "text-white hover:bg-gray-700 hover:text-white";

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button (optional, can remove too) */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Main navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/movies"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${isActive("/movies")}`}
                >
                  Movies
                </Link>
                <Link
                  to="/signin"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${isActive("/signin")}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${isActive("/signup")}`}
                >
                  Sign Up
                </Link>
                <Link
                  to="/bookinghistory"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${isActive("/booking-history")}`}
                >
                  Booking History
                </Link>
              </div>
            </div>
          </div>

          {/* ✅ REMOVED this entire block:
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            ...notification and profile image...
          </div>
          */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
