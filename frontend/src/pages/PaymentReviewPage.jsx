import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentReviewPage = () => {
  const location = useLocation();
  const parems = useParams();
  const [flight, setFlight] = useState({});
  const { bookingId, passengers } = location.state || {};
  const navigate = useNavigate()
  const user = localStorage.getItem("user")

  useEffect(() => {
    const getFlight = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/airplane/api/flight/by-id/${parems.id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setFlight(data.data.flight[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getFlight();
  }, []);

  const handlePayment = async (e) => {
    try {
      const res = await fetch(`http://localhost:4000/book/api/Payment/${bookingId}`, {
        method : "POST",
        credentials : "include",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({})
      })

      const data = await res.json()
      console.log(data)

      if(data.success){
        alert(data.message)
        navigate(`/user/${user}`)
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-100 flex flex-col text-sm sm:text-base">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Flight Details */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            ✈️ Flight Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p><strong>Flight ID:</strong> {flight?.flight_id}</p>
              <p><strong>Model:</strong> {flight?.airplane_model}</p>
              <p><strong>Price:</strong> ₹{passengers?.total_price}</p>
            </div>
            <div>
              <p><strong>Departure:</strong> {flight?.departure_airport_name} ({flight?.departure_time})</p>
              <p><strong>Arrival:</strong> {flight?.arrival_airport_name} ({flight?.arrival_time})</p>
              <p><strong>Available Seats:</strong> {flight?.available_seat}</p>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            👤 Passenger Details
          </h2>
          {passengers?.candidates.map((p, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50"
            >
              <p className="font-medium">Passenger {index + 1}</p>
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Age:</strong> {p.age}</p>
              {/* <p><strong>Gender:</strong> {p.gender}</p> */}
            </div>
          ))}
        </div>

        {/* Payment CTA */}
        <div className="flex justify-end">
          <button
            onClick={handlePayment}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-200"
          >
            💳 Proceed to Pay
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentReviewPage;
