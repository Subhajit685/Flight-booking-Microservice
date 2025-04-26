import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Advertisement from "../components/Advertisement";
import { Link } from "react-router-dom";
import FlightCard from "../components/FlightCard";

const Home = () => {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    candidate: 1,
  });

  const [flights, setFlights] = useState([]);
  const [priceFiltermax, setPriceFiltermax] = useState(0);
  const [priceFiltermin, setPriceFiltermin] = useState(0);
  const [timeFilter, setTimeFilter] = useState("");

  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);

  let str = localStorage.getItem("str") ? localStorage.getItem("str") : "";
  let from = localStorage.getItem("from") ? localStorage.getItem("from") : "";
  let to = localStorage.getItem("to") ? localStorage.getItem("to") : "";
  const handleSearch = async () => {
    str = "";

    if (searchData.candidate > 0) {
      str = str + `candidate=${searchData.candidate}&`;
    }
    if (searchData.date) {
      const inputDate = searchData.date; // YYYY-MM-DD
      const [year, month, day] = inputDate.split("-");
      const formattedDate = `${day}-${month}-${year}`;
      str = str + `date=${formattedDate}&`;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/airplane/api/flight/filter?${str}travel=${searchData.from}-${searchData.to}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      console.log(data);
      if (data.success) {
        localStorage.setItem("flights", JSON.stringify(data.data.filter));
        localStorage.setItem("max", data.max);
        localStorage.setItem("min", data.min);
        localStorage.setItem("str", str);
        localStorage.setItem("from", searchData.from);
        localStorage.setItem("to", searchData.to);
        localStorage.setItem("candidate", searchData.candidate);
        setFlights(data.data.filter);
        setmin(data.min);
        setmax(data.max);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchFilter = async () => {
    if (priceFiltermax !== 0) {
      str = str + `price=${priceFiltermin}-${priceFiltermax}&`;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/airplane/api/flight/filter?${str}travel=${
          searchData.from ? searchData.from : from
        }-${searchData.to ? searchData.to : to}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      // console.log(data.data)
      console.log(data);
      if (data.success) {
        localStorage.setItem("flights", JSON.stringify(data.data.filter));
        setFlights(data.data.filter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const matchTimeSlot = (flightTime, filterTime) => {
    if (!filterTime) return true;
    const hour = parseInt(flightTime);
    if (filterTime === "Morning") return hour >= 5 && hour < 12;
    if (filterTime === "Afternoon") return hour >= 12 && hour < 17;
    if (filterTime === "Evening") return hour >= 17 && hour < 20;
    if (filterTime === "Night") return hour >= 20 || hour < 5;
    return true;
  };

  useEffect(() => {
    const loclFlights = localStorage.getItem("flights");

    if (loclFlights) {
      setFlights(JSON.parse(loclFlights));
      setmax(localStorage.getItem("max"));
      setmin(localStorage.getItem("min"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-100 flex flex-col text-sm sm:text-base">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 p-3 sm:p-4 max-w-7xl mx-auto w-full">
        {/* Search Bar */}
        <div className="bg-white shadow-md p-4 sm:p-6">
          <h2 className="text-xl mb-2 text-gray-700 font-bold">
            Get. Set. Travel
          </h2>
          <div className="flex flex-col lg:flex-row flex-wrap gap-3 sm:gap-4">
            {["from", "to", "date", "candidate"].map((field, idx) => (
              <input
                key={idx}
                type={
                  field === "date"
                    ? "date"
                    : field === "candidate"
                    ? "number"
                    : "text"
                }
                name={field}
                value={searchData[field]}
                onChange={handleChange}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                // min={field === "passengers" ? 1 : undefined}
                className="p-2 border border-teal-300 rounded w-full lg:w-[18%] focus:outline-teal-500"
              />
            ))}
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-blue-600 font-bold cursor-pointer transition w-full lg:w-[20%]"
            >
              Search
            </button>
          </div>
        </div>

        {/* Advertisements */}
        {flights.length === 0 && (
          <div className="w-full overflow-hidden rounded-lx mt-6 shadow-md">
            <h2 className="text-sm sm:text-xl m-1 sm:m-4 font-bold text-gray-700">
              Best Offers For You!
            </h2>

            <img src="hero.webp" className="w-full" alt="hero image" />
          </div>
        )}

        {flights.length === 0 && (
          <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-sm sm:text-base">
            <Advertisement img={"/add_one.webp"} />
            <Advertisement img={"/add_two.webp"} />
            <Advertisement img={"/add_three.webp"} />
          </div>
        )}

        {flights.length === 0 && (
          <div className="w-full overflow-hidden rounded-lx mt-6 shadow-md">
            <h2 className="text-sm sm:text-xl m-1 sm:m-4 font-bold text-gray-700">
              Banking Offers
            </h2>

            <img src="/add_four.webp" className="w-full" alt="hero image" />
          </div>
        )}

        {/* Flights and Filters */}
        {flights.length > 0 && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Filters */}
            <aside className="bg-white p-4 shadow">
              <h2 className="text-base sm:text-lg font-bold mb-3 text-teal-700">
                Filter Flights
              </h2>

              {/* Price Slider */}
              <div className="mb-4">
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price: ₹{max}
                </label> */}
                <div className="flex gap-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min price
                    </label>
                    <input
                      className="border rounded w-full p-1"
                      placeholder="0"
                      type="number"
                      onChange={(e) => {
                        setPriceFiltermin(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max price
                    </label>
                    <input
                      className="border rounded w-full p-1"
                      placeholder="0"
                      type="number"
                      onChange={(e) => {
                        setPriceFiltermax(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    ₹{min}
                  </span>
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    ₹{max}
                  </span>
                </div>
              </div>

              {/* Time Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Day
                </label>
                <select
                  name="time"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="p-2 border rounded w-full"
                >
                  <option value="">All Times</option>
                  <option value="Morning">Morning (5 AM - 12 PM)</option>
                  <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="Evening">Evening (5 PM - 8 PM)</option>
                  <option value="Night">Night (8 PM - 5 AM)</option>
                </select>
              </div>

              <div className="w-full">
                <button
                  onClick={handleSearchFilter}
                  className="bg-blue-500 text-white px-2 sm:px-4 py-2 sm:py-3 rounded hover:bg-blue-600 font-bold cursor-pointer transition w-full mt-4"
                >
                  Search Flights
                </button>
              </div>
            </aside>

            {/* Flights List */}
            <section className="lg:col-span-3 space-y-3 sm:space-y-4">
              {flights.map((flight, i) => (
                <FlightCard key={i} flight={flight} searchData={searchData} />
              ))}
            </section>
          </div>
        )}

        {flights.length === 0 && (
          <div className="mt-10 text-gray-400 flex flex-col gap-2">
            <h2 className="text-xl font-bold">About SkyBooking</h2>
            <p>
              Welcome to SkyBooking – your one-stop destination for hassle-free
              flight bookings at the best prices. Whether you're planning a
              weekend getaway, a business trip, or a family vacation, we've got
              you covered with a wide range of domestic and international
              flights.
            </p>

            <p>At SkyBooking, we make it easy to: </p>
            <ul>
              <li>Search and compare flights from top airlines.</li>
              <li>Enjoy exclusive banking offers and seasonal deals.</li>
              <li>Book quickly with a smooth, responsive interface.</li>
              <li>Get support whenever you need — we're here 24x7.</li>
            </ul>

            <p>
              We believe in making air travel accessible, affordable, and
              stress-free — just the way booking should be. No hidden fees. No
              last-minute surprises. Just seamless sky journeys, every time.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
