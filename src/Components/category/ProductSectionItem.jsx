import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip, Typography } from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/slices/cartSlice";
import { singleProduct } from "../../features/slices/productsSlice";

const ProductSectionItem = ({ id, img, name, price, totalPrice }) => {
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(singleProduct(id));
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <Card
        className="w-96 h-auto   flex flex-col shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
        onClick={handleCardClick}
      >
        <Link to={`/product/${id}`}>
          <CardHeader floated={false} className="relative h-64">
            <img
              src={img}
              alt={name}
              className="inset-0 w-fit h-fit"
            />
          </CardHeader>
        </Link>
        <CardBody className="flex flex-col justify-between p-4">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography color="red" className="font-semibold text-lg">
            ${price.toFixed(2)}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center p-4">
          <Tooltip content="Add to Cart" placement="bottom">
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the click event from propagating to the Card
                dispatch(
                  addToCart({
                    id: id,
                    img: img,
                    text: name,
                    amount: 1,
                    price: price,
                    totalPrice: totalPrice,
                    name: name,
                    size: "", // Default value
                    color: "", // Default value
                  })
                );
              }}
              size="lg"
              color="blue"
              variant="gradient"
              ripple={true}
            >
              Add to Cart
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductSectionItem;
