import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './NavBar'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'; // Add Navigate
import Movies from './Movies'
import SignIn from './SignIn'
import SignUp from './SignUp'
import React from 'react'
import MovieDetails from './MovieDetails'
import BookTicket from './BookTicket'
import SeatLayout from './SeatLayout'
import BookingHistory from './BookinHistory'






function App() {

  const [particularMovieDetails, setParticularMovieDetails] = React.useState("")

  const [selectedSeatCount, setSelectedSeatCount] = useState(1);

  return (
    <div>
      
      <NavBar/>
      <Routes>

        {/* ✅ Home route shows Movies */}
        <Route path="/" element={<Movies details={setParticularMovieDetails} />} />

        <Route path='/movies' element={<Movies details={setParticularMovieDetails} />}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/moviedetails" element={<MovieDetails movie={particularMovieDetails} />} />
        <Route path="/booktickets" element={<BookTicket 
          selectedSeatCount={selectedSeatCount}
          setSelectedSeatCount={setSelectedSeatCount} />}
        />
        <Route path="/seatlayout" element={<SeatLayout count={selectedSeatCount}/>} />
        <Route path="/bookinghistory" element={<BookingHistory/>} />
      </Routes>

      
    </div>
  )
}

export default App
