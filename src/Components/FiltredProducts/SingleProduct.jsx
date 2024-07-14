import { Button, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../features/slices/cartSlice";
import { fetchProducts } from "../../features/slices/productsSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch all products from Redux store
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);

        // Find related products based on the category
        const categoryRelatedProducts = allProducts.filter(
          (item) => item.category === data.category && item.id !== data.id
        );
        setRelatedProducts(categoryRelatedProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, allProducts]);

  // Fetch products if they are not loaded yet
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Calculate discounted price
  const discountPercentage = 15;
  const discount = (product.price * discountPercentage) / 100;
  const discountedPrice = product.price - discount;

  return (
    <div>
      <div className="flex justify-center items-center py-10 relative pl-52">
        <div className="pl-16 grow-[2]">
          <img
            className="w-[400px] h-[400px] object-cover rounded-lg"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="grow-[3]">
          <div className="max-w-lg">
            <h5 className="text-2xl font-inter font-bold tracking-normal leading-none pb-4">
              {product.title}
            </h5>
            <p className="text-orange-700 text-xl font-inter font-bold tracking-normal leading-none pb-4">
              <span className="line-through">${product.price.toFixed(2)}</span>{" "}
              ${discountedPrice.toFixed(2)}{" "}
              <span className="text-sm">15% OFF</span>
            </p>
            <p className="text-gray-600 text-xl font-inter font-bold tracking-normal leading-none pb-4">
              {product.description}
            </p>

            <div className="flex items-center space-x-4 pb-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="text-lg font-inter font-bold">{quantity}</span>
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <Tooltip content="Add to Cart" placement="bottom">
              <Button
                color="gray"
                size="lg"
                variant="outlined"
                ripple={true}
                className="transition-colors duration-300 hover:bg-black hover:text-white"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      name: product.title,
                      img: product.image,
                      description: product.description,
                      price: discountedPrice,
                      amount: quantity,
                      totalPrice: discountedPrice * quantity,
                      size: "", // Default value
                      color: "", // Default value
                      text: "", // Default value
                    })
                  )
                }
              >
                Add to Cart
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <Button
            color="gray"
            size="lg"
            variant="outlined"
            ripple={true}
            className="transition-colors duration-300 hover:bg-black hover:text-white"
            onClick={() => navigate(-1)} // Navigate to the previous page
          >
            Back
          </Button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="py-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-4 border-orange-500 pb-2">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <Link
              to={`/product/${relatedProduct.id}`} // Adjust the route as needed
              key={relatedProduct.id}
              className="border border-gray-300 rounded-lg p-4"
            >
              <img
                className="h-40 w-full object-cover rounded-lg"
                src={relatedProduct.image}
                alt={relatedProduct.title}
              />
              <h3 className="text-lg font-inter font-bold mt-2">
                {relatedProduct.title}
              </h3>
              <p className="text-orange-700 text-sm mt-1">
                ${relatedProduct.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
