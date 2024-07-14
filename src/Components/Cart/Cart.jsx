  import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link
import { removeFromCart } from "../../features/slices/cartSlice";

  const Cart = ({ openModal, setOpen }) => {
    const cart = useSelector((state) => state.cart.cart);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    const dispatch = useDispatch();

    return (
      <div>
        <Dialog
          className="border-0 outline-0 max-w-3xl"
          open={openModal}
          handler={() => setOpen(false)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Shopping Bag</DialogHeader>
          <DialogBody
            divider
            className="flex flex-col overflow-y-auto max-h-96"
          >
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="grid grid-cols-2 py-4">
                  <div>
                    <img
                      className="h-[125px] rounded-md"
                      src={item.img}
                      alt={item.name}
                    />
                    <div className="flex flex-col items-start">
                      <h4 className="text-black text-base font-inter font-bold tracking-normal leading-none pt-2">
                        {item.name}
                      </h4>
                    </div>
                    <div className="max-w-xs">
                      <p className="text-black text-xs font-inter tracking-normal leading-none pt-2">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Selected size:{" "}
                      <span className="ml-2">{item.size}</span>
                    </p>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Selected color:{" "}
                      <span
                        className="ml-2 rounded-full px-2"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </p>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Amount: <span className="ml-2">{item.amount}</span>
                    </p>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Single Item Price:{" "}
                      <span className="ml-2">{item.price}$</span>
                    </p>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Total Item Prices:{" "}
                      <span className="ml-2">{item.totalPrice}$</span>
                    </p>
                    <div className="pt-4">
                      <Tooltip content="Remove from the Cart" placement="bottom">
                        <Button
                          onClick={() => dispatch(removeFromCart(item))}
                          size="sm"
                          color="red"
                          ripple={true}
                          variant="filled"
                        >
                          Remove
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <h1 className="text-black text-3xl font-inter font-bold tracking-normal leading-none py-4">
                  Your bag is empty
                </h1>
                <p className="text-black text-base font-inter tracking-normal leading-none">
                  Add some products
                </p>
              </div>
            )}
          </DialogBody>
          {cart.length > 0 && (
            <DialogFooter className="flex flex-col items-start">
              <p className="text-black text-base font-inter tracking-normal leading-none pt-2">
                Total Price of All Products:{" "}
                <span className="ml-2">{totalPrice}$</span>
              </p>
              <Link to="/checkout">
                <Button color="orange" className="mt-4">
                  Proceed to Checkout
                </Button>
              </Link>
            </DialogFooter>
          )}
        </Dialog>
      </div>
    );
  };

  export default Cart;
