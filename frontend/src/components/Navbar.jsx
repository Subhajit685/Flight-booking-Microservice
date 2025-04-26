import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let user = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user/api/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.removeItem("user");
        localStorage.removeItem("flights");
        localStorage.removeItem("max");
        localStorage.removeItem("min");
        localStorage.removeItem("str");
        localStorage.removeItem("from");
        localStorage.removeItem("to");
        localStorage.removeItem("candidate");
        alert("Logout successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-blue-500 text-white shadow-md text-sm sm:text-base">
      <div className="max-w-7xl mx-auto w-full p-3 sm:p-4 flex justify-between items-center">
        <Link to={"/"}>
          <h1
            className="text-base sm:text-xl font-bold"
            onClick={() => {
              localStorage.removeItem("flights");
            }}
          >
            SkyBooking
          </h1>
        </Link>
        {user ? (
          <span>
            <Link
              className="bg-white text-blue-500 text-base font-medium py-1 px-4 rounded cursor-pointer hover:bg-gray-200 transition"
              to={`/user/${user}`}
            >
              {user}
            </Link>{" "}
            <span
              className="bg-white text-blue-500 text-base font-medium py-1 px-4 rounded cursor-pointer hover:bg-gray-200 transition"
              onClick={logout}
            >
              Logout
            </span>
          </span>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-500 text-base font-medium py-1 px-4 rounded cursor-pointer hover:bg-gray-200 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
