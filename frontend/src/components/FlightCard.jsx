import React from "react";
import { Link } from "react-router-dom";

const FlightCard = ({ flight, searchData }) => {
  return (
    <div>
      <div
        className="bg-white p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        {/* Flight Info */}
        <div className="text-center sm:text-left flex justify-between sm:flex-col">
          <h3 className="font-semibold text-base sm:text-lg text-gray-800">
            {flight.flight_id}
          </h3>
          <h3 className="font-semibold text-base sm:text-lg text-gray-800">
            {flight.airplane_model}
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
          <p className="text-lg font-bold text-gray-800">₹{flight.price}</p>
          <Link
            to={`/flight/${flight.flight_id}`}
            className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-600 transition"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
