import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { XCircle } from "lucide-react";

const AllBookingsPage = () => {
  const parems = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/book/api/book/show/booking/${parems.email}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (data.success) {
          setBookings(data.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [parems.email]);

  const handleCancelBooking = async (bookingID) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `http://localhost:4000/book/api/book/cancle/${bookingID}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      if (result.success) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingID));
        alert("Booking cancelled successfully.");
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("An error occurred while cancelling the booking.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-white flex flex-col text-sm sm:text-base">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-teal-800 mb-8 text-center">
          🛫 Your Flight Bookings
        </h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white hover:shadow-lg transition-all shadow-md rounded-xl p-6 border border-gray-200 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    Booking ID:{" "}
                    <span className="text-indigo-600">{booking.id}</span>
                  </h2>
                  <span className="px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">
                    {booking.flight_id}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Passengers:</strong> {booking.num_candidates}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{booking.totel_price}
                  </p>
                  <p>
                    <strong>Booked on:</strong>{" "}
                    {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition duration-200"
                >
                  <XCircle className="w-5 h-5" />
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookingsPage;
