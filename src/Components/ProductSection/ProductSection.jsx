import React from "react";
import { Link } from "react-router-dom";
import women from "../../assets/images/2.jpg";
import men from "../../assets/images/3.jpg";
import electronics from "../../assets/images/4.jpg";
import jewelry from "../../assets/images/5.jpg";

const ProductSection = () => {
  return (
    <div className="flex flex-wrap w-full h-screen bg-gray-100">
      {/* Category Links with Overlay Text */}
      <Link
        to="/category/men's clothing"
        className="w-1/2 h-1/2 relative border-4 border-transparent overflow-hidden group"
      >
        <img
          src={men}
          alt="Men's Clothing"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-500 opacity-100 group-hover:opacity-100">
          <h2 className="text-white text-3xl font-bold uppercase tracking-wider text-center">
            Men's Clothing
          </h2>
        </div>
      </Link>
      <Link
        to="/category/jewelery"
        className="w-1/2 h-1/2 relative border-4 border-transparent overflow-hidden group"
      >
        <img
          src={jewelry}
          alt="Jewelry"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-500 opacity-100 group-hover:opacity-100">
          <h2 className="text-white text-3xl font-bold uppercase tracking-wider text-center">
            Jewelry
          </h2>
        </div>
      </Link>
      <Link
        to="/category/electronics"
        className="w-1/2 h-1/2 relative border-4 border-transparent overflow-hidden group"
      >
        <img
          src={electronics}
          alt="Electronics"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-500 opacity-100 group-hover:opacity-100">
          <h2 className="text-white text-3xl font-bold uppercase tracking-wider text-center">
            Electronics
          </h2>
        </div>
      </Link>
      <Link
        to="/category/women's clothing"
        className="w-1/2 h-1/2 relative border-4 border-transparent overflow-hidden group"
      >
        <img
          src={women}
          alt="Women's Clothing"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-500 opacity-100 group-hover:opacity-100">
          <h2 className="text-white text-3xl font-bold uppercase tracking-wider text-center">
            Women's Clothing
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default ProductSection;
