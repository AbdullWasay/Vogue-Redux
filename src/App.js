// src/App.jsx
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import CategoryPage from "./Components/category/CategoryPage";
import Checkout from "./Components/checkout/checkout";
import Contact from "./Components/Contact/contact";
import SingleProduct from "./Components/FiltredProducts/SingleProduct";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const user = useSelector((state) => state.user.user);
  const { authUser, role } = user;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? (role === "admin" ? <AdminDashboard /> : <Main />) : <Login />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add routes for admin and product updates */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
