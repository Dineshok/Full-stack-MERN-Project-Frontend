import React, { useEffect, useState } from "react";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    setBookings(data);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-3 rounded shadow-sm border"
          >
            <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
            <p><strong>Amount:</strong> ₹{booking.amount/100}</p>
            <p><strong>Booked On:</strong> {booking.time}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BookingHistory;
