import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    days.push({
      date: day,
      label: day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      day: day.getDate(),
      month: day.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
    });
  }
  return days;
}



function BookTicket({setSelectedSeatCount, selectedSeatCount}) {
  const [cityAndTheatres, setCityAndTheatres] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [next7Days, setNext7Days] = useState(getNext7Days());

  

  const handleSeatCountSelection = (count) => {
    setSelectedSeatCount(count);
  };


  useEffect(() => {
    Axios.get("https://movie-booking-application-back-end-4ph1.onrender.com/bookingdetails").then((output) => {
      setCityAndTheatres(output.data.bookingdetails);
      setSelectedCity(output.data.bookingdetails[0]?.city || null);
    });
  }, []);

  const filteredCityData = cityAndTheatres.find(
    (item) => item.city.toLowerCase() === selectedCity?.toLowerCase()
  );

  const navigate = useNavigate()

  function closeModalAndNavigate() {
    // Close the Bootstrap modal
    const modalEl = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl); // if already open
    if (modalInstance) {
      modalInstance.hide();
    }
    // Navigate after closing
    navigate("/seatlayout");
  }




  return (

    <>
    <style>
      {`
        .number-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          font-weight: 500;
          font-size: 14px;
          border: none;
          background-color: transparent;
          color: #000;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .number-btn.selected {
          background-color: #dc3545;
          color: white;
        }
      `}
    </style>


    <div style={{ padding: 20 }}>
      {/* City Dropdown */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              padding: "8px 14px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }}
          >
            {selectedCity || "Select City"}
            <span style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
          </button>

          {dropdownOpen && (
            <ul
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "8px",
                listStyle: "none",
                padding: "5px 0",
                margin: 0,
                zIndex: 1000,
                width: "160px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              {cityAndTheatres.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedCity(item.city);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    backgroundColor: selectedCity === item.city ? "#f5f5f5" : "white",
                    fontWeight: selectedCity === item.city ? "600" : "400"
                  }}
                >
                  {item.city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Date Selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {next7Days.map((d, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedDate(d.date)}
            style={{
              cursor: 'pointer',
              padding: '8px 12px',
              textAlign: 'center',
              borderRadius: '10px',
              border: selectedDate.toDateString() === d.date.toDateString() ? '2px solid #d9534f' : '1px solid #ccc',
              backgroundColor: selectedDate.toDateString() === d.date.toDateString() ? '#f8d7da' : '#fff',
              fontWeight: '500',
              width: 60
            }}
          >
            <div style={{ fontSize: '10px' }}>{d.label}</div>
            <div style={{ fontSize: '18px' }}>{d.day}</div>
            <div style={{ fontSize: '10px' }}>{d.month}</div>
          </div>
        ))}
      </div>

      {/* Theatre Cards */}
      {selectedCity && filteredCityData && (
        <div>
          {filteredCityData.theatres.map((theatre, i) => (
            <div
              key={i}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{theatre.theatreName}</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {theatre.showTimes.map((time, idx) => (
                  <button
                    class="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    //^ for opening the selecting seats model(window) from bootstrap
                    key={idx}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      color: 'green',
                      cursor: 'pointer'
                    }}
                    //onClick={selectNumberOfSeats}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {/* Modal */}
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">How Many Seats?</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div className="d-flex justify-content-center gap-3 flex-wrap">
                        {[...Array(8)].map((_, index) => {
                          const count = index + 1;
                          return (
                            <button
                              key={count}
                              type="button"
                              className={`number-btn ${selectedSeatCount === count ? 'selected' : ''}`}
                              onClick={() => handleSeatCountSelection(count)}
                            >
                              {count}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button onClick={closeModalAndNavigate} type="button" class="btn btn-danger">Select Seats</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>  
  );
}

export default BookTicket;
