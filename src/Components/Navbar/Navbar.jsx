import { Tooltip } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { logout } from "../../features/slices/authSlice";
import Cart from "../Cart/Cart";

const Navbar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const { authUser, role } = user;
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  // Check if the current path is the login route
  // Use a condition based on authUser status
  const isLoginPage = !authUser; 

  // Determine whether to display the links
  const showLinks = authUser && role !== "admin";

  return (
    <div className="flex bg-black items-center p-4">
      <div>
        <img className="h-20" src={logo} alt="store" />
      </div>
      <div className="flex-1 flex justify-center space-x-14">
        {showLinks && (
          <>
            <Link
              to="/"
              className="font-inter text-white text-base font-medium tracking-normal leading-none text-center hover:text-orange-500 transition-colors duration-300"
            >
              Home
            </Link>

         

            <div className="relative group">
              <Link
                className="font-inter text-white text-base font-medium tracking-normal leading-none text-center hover:text-orange-500 transition-colors duration-300"
              >
                Products
              </Link>
              <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded-lg shadow-lg z-50 w-48 group-hover:w-56 transition-all duration-300">
                <Link to="/category/men's clothing" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                  Men's Clothing
                </Link>
                <Link to="/category/jewelery" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                  Jewelry
                </Link>
                <Link to="/category/electronics" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                  Electronics
                </Link>
                <Link to="/category/women's clothing" className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                  Women's Clothing
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className="font-inter text-white text-base font-medium tracking-normal leading-none text-center hover:text-orange-500 transition-colors duration-300"
            >
              Contact
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div
          className="flex items-center cursor-pointer hover:text-orange-500 transition-colors duration-300"
          onClick={handleOpen}
        >
          {totalAmount > 0 ? (
            <span className="rounded-full bg-gray-300 px-2 font-inter text-sm mr-1">
              {totalAmount}
            </span>
          ) : (
            <i className="fas fa-shopping-bag text-white text-xl"></i>
          )}
          {open && <Cart openModal={open} setOpen={setOpen} />}
        </div>
        <div className="flex items-center cursor-pointer hover:text-orange-500 transition-colors duration-300">
          <div onClick={() => dispatch(logout())}>
            <Tooltip content="Sign Out" placement="bottom">
              <i className="fas fa-user text-white text-xl"></i>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
