import React, { useState } from 'react'
import './SeatLayout.css'
import  Axios  from 'axios';
import { useNavigate } from "react-router-dom";

function SeatLayout({ count }) {
  const rows = ['A','B','C','D','E','F','G']; // stopped at G
  const cols = 15

  const Navigate = useNavigate()

  const [selectedSeats, setSelectedSeats] = useState([])

  function toggleSeat(row, col) {
    const seatLabel = `${row}${col}`

    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatLabel))
    } else if (selectedSeats.length < count) {
      setSelectedSeats([...selectedSeats, seatLabel])
    }
  }

  function goToPayment(){
    Axios.post("https://movie-booking-application-back-end-4ph1.onrender.com/create/order", {amount : selectedSeats.length * 150})
    .then((result)=>{
      verifyPayment(result.data.orderInfo)
    })
  }

  async function verifyPayment(receivedData) {
    const details = {
      key: "rzp_test_SE61Bb5xwfvQqP",
      amount: receivedData.amount,
      currency: "INR",
      order_id: receivedData.id,
      handler: async (output) => {
        // ✅ Save ticket info to localStorage
        const newBooking = {
          seats: selectedSeats,
          amount: receivedData.amount,
          time: new Date().toLocaleString()
        };

        const prevBookings = JSON.parse(localStorage.getItem("bookingHistory")) || [];

        const updatedBookings = [...prevBookings, newBooking];
        
        //we are using localStorage from browser
        localStorage.setItem("bookingHistory", JSON.stringify(updatedBookings));

        Navigate("/bookinghistory"); 
      }
    };

    new window.Razorpay(details).open();
  }


  return (
    <div style={{ textAlign: "center" }}>
      <h3>Select {count} Seats</h3>
      {rows.map(row => (
        <div className="seat-layout-wrapper" key={row} style={{ maxWidth: "100%" }}>
          <div className="seat-row">
            <div className="row-label">{row}</div>
            {Array.from({ length: cols }, (_, i) => {
              const col = i + 1
              const seatLabel = `${row}${col}`
              const isSelected = selectedSeats.includes(seatLabel)

              return (
                <button
                  key={seatLabel}
                  className={`seat ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleSeat(row, col)}
                >
                  {col}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      <button className='btn btnbtn btn-danger' onClick={goToPayment}>Make Payment</button>
    </div>
  )
}

export default SeatLayout
