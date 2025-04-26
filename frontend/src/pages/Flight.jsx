import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";

const Flight = () => {
  const parems = useParams();
  const candidate = localStorage.getItem("candidate");
  const [flight, setflight] = useState({});
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState(
    Array.from({ length: candidate }, () => ({ name: "", age: "" }))
  );

  const [email, setemail] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handelpay = async (e) => {
    e.preventDefault();

    const value = {
      flight_id: parems.id,
      email: email,
      candidates: passengers,
      num_candidates: candidate,
      total_price: candidate * flight.price,
    };
    // console.log(JSON.stringify(value))
    try {
      const res = await fetch(
        `http://localhost:4000/book/api/book/flight-booking`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.success) {
        localStorage.removeItem("flights");
        localStorage.removeItem("max");
        localStorage.removeItem("min");
        localStorage.removeItem("str");
        localStorage.removeItem("from");
        localStorage.removeItem("to");
        localStorage.removeItem("candidate");
        navigate(`/payment/${parems.id}`, {
          state: {
            bookingId: data.data.id,
            passengers: value,
          },
        });
      } else {
        if (data.message === "Please login.") {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        // console.log(data.data.flight)
        setflight(data.data.flight[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getFlight();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-100 flex flex-col text-sm sm:text-base">
      <Navbar />

      <main className="flex-1 p-3 sm:p-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="w-[70%] bg-white shadow-md flex flex-col items-center">
            <div className="bg-white w-full p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Flight Info */}
              <div className="text-center sm:text-left flex justify-between sm:flex-col">
                <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                  {flight?.flight_id}
                </h3>
                <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                  {flight?.airplane_model}
                </h3>
                <div className="flex flex-col">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Departure time: {flight.departure_time}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Arrival time: {flight.arrival_time}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Passengers: {flight.available_seat}
                  </p>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-700 font-medium">
                <p>{flight.departure_airport_name}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#4a4a4a"
                  fill="none"
                >
                  <path
                    d="M19 9H6.65856C5.65277 9 5.14987 9 5.02472 8.69134C4.89957 8.38268 5.25517 8.01942 5.96637 7.29289L8.21091 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 15H17.3414C18.3472 15 18.8501 15 18.9753 15.3087C19.1004 15.6173 18.7448 15.9806 18.0336 16.7071L15.7891 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>{flight.arrival_airport_name}</p>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
                <p className="text-lg font-bold text-gray-800">
                  ₹{flight.price}
                </p>
              </div>
            </div>

            <div className="h-[1px] w-[95%] bg-gray-200"></div>

            <form className="w-full max-w-sm bg-white p-6 rounded-lg">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exapmle@gmail.com"
                  required
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Passenger Detailes
                </label>

                {Array.from({ length: candidate }).map((_, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-bold mb-2">Passenger {i + 1}</h3>
                    <input
                      type="text"
                      placeholder="Name"
                      value={passengers[i].name}
                      onChange={(e) => handleChange(i, "name", e.target.value)}
                      className="border p-2 mr-2"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={passengers[i].age}
                      onChange={(e) => handleChange(i, "age", e.target.value)}
                      className="border p-2"
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                onClick={handelpay}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Confirm
              </button>
            </form>
          </div>

          <aside className="w-[30%] h-1/2 bg-white shadow-md p-2 flex flex-col gap-4 text-gray-600">
            <h2 className="text-gray-700 font-bold text-base mt-2">
              Fare Defauls
            </h2>
            <div className="h-[1px] bg-gray-200"></div>
            <div className="flex items-center justify-between">
              <p>Fare Type</p>
              <p>Partially Refundable</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Base Fare (1 Traveller)</p>
              <p>₹{flight.price}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Candidate</p>
              <p>{candidate}</p>
            </div>
            <div className="h-[1px] bg-gray-200"></div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-bold text-xl">Total amount</p>
              <p className="text-gray-700 font-bold text-xl">
                ₹{candidate * flight.price}
              </p>
            </div>
            <div className="h-[1px] bg-gray-200"></div>
            <p className="text-[0.8rem] mb-2">
              * Convenience fee will be added on payments page
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Flight;
