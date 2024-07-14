import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductSectionItem from "./ProductSectionItem";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const categoryProducts = category === 'all' ? data : data.filter(product => product.category === category);
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    let updatedProducts = [...products];

    // Sort products
    if (sortBy === 'price-asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      updatedProducts.sort((a, b) => b.rating - a.rating);
    }

    // Filter by price
    updatedProducts = updatedProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);

    setFilteredProducts(updatedProducts);
  }, [sortBy, minPrice, maxPrice, products]);

  return (
    <div>
      <h1 className="text-left text-4xl font-bold my-4 capitalize px-36 pt-10">
        {category.replace(/-/g, ' ')}
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center px-36 py-4 space-y-4 md:space-y-0">
        {/* Sorting Dropdown */}
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 font-semibold text-lg">Sort By:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="minPrice" className="mr-2 font-semibold text-lg">Min Price:</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="maxPrice" className="mr-2 font-semibold text-lg">Max Price:</label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-36 py-8">
        {filteredProducts.map((product) => (
          <ProductSectionItem
            key={product.id}
            id={product.id}
            name={product.title}
            img={product.image}
            price={product.price}
            totalPrice={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;