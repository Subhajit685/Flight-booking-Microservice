import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Flight from "./pages/Flight";
import PaymentReviewPage from "./pages/PaymentReviewPage";
import Sign from "./pages/Sign";
import AllBookingsPage from "./pages/AllBookingsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Register />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/flight/:id" element={<Flight />} />
      <Route path="/user/:email" element={<AllBookingsPage />} />
      <Route path="/payment/:id" element={<PaymentReviewPage
       />} />
    </Routes>
  );
};

export default App;
