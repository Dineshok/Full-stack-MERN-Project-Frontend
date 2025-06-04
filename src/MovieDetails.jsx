import React from "react";
import { useNavigate } from "react-router-dom";

function MovieDetails({ movie }) {
    const Navigate = useNavigate()

    function bookTicket(){
        Navigate("/booktickets")
    }

  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: `url(${movie.image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="md:w-1/3 w-full">
          <img
            src={movie.image_url}
            alt={movie.movie_name}
            className="rounded-lg w-full shadow-xl"
          />
        </div>

        {/* Details */}
        <div className="md:w-2/3 w-full">
          <h1 className="text-4xl font-bold mb-4">{movie.movie_name}</h1>
          <div className="flex flex-wrap gap-3 mb-4 text-sm">
            <span className="bg-gray-800 px-3 py-1 rounded">{movie.genre}</span>
            <span className="bg-red-600 px-3 py-1 rounded">{movie.censor}</span>
            <span className="bg-blue-700 px-3 py-1 rounded">
              Directed by {movie.director}
            </span>
          </div>
          <p className="text-lg leading-relaxed mb-6">{movie.description}</p>

          {/* Booking button */}
            <div className="mt-6 mb-6 flex justify-center md:justify-start">
            <button
                onClick={bookTicket}
                className="bg-[#f84464] hover:bg-[#e63756] text-white text-base font-semibold px-8 py-3 rounded w-48 transition-all duration-200 shadow-none"
            >
                🎟️ Book Tickets
            </button>
            </div>

          <h2 className="text-2xl font-semibold mb-2">Cast</h2>
          <div className="flex flex-wrap gap-4">
            {movie.cast.map((actor, index) => (
              <div
                key={index}
                className="bg-gray-700 px-4 py-2 rounded text-white text-sm"
              >
                {actor}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
