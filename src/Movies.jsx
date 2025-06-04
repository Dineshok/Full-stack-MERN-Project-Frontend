import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";



function Movies(props) {
  const Navigate = useNavigate()

  
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    Axios.get("https://movie-booking-application-back-end-4ph1.onrender.com/fetch/movies/all")
      .then((result) => {
        setMovieDetails(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function displayMovieDetails(movie){
    props.details(movie)
    Navigate("/moviedetails")
  }

  return (
    <div className="px-8 py-6">
      <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movieDetails.map((movie, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-md bg-white transform transition duration-300 hover:scale-105"
          >
            <img
              onClick={()=>{displayMovieDetails(movie)}}
              src={movie.image_url}
              alt={movie.movie_name}
              className="w-full h-72 object-cover"
            />
            <div className="bg-black text-white text-sm px-3 py-1 flex items-center justify-between">
              <span className="bg-red-600 px-2 py-0.5 rounded text-xs font-semibold">
                {movie.censor}
              </span>
              <span className="truncate text-right text-xs w-full pl-2">
                {movie.genre}
              </span>
            </div>
            <div className="p-3">
              <h5 className="text-md font-bold text-gray-800">
                {movie.movie_name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
