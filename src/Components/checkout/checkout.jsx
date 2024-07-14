import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Alert from './Alert';
import Loader from './Loader'; // Import the Loader component

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  cardNumber: Yup.string().length(16, 'Card number must be 16 digits').required('Required'),
  month: Yup.string().required('Required'),
  year: Yup.string().required('Required'),
  securityCode: Yup.string().length(3, 'Security code must be 3 digits').required('Required'),
  cardName: Yup.string().required('Required'),
});

const Checkout = () => {
  const [loading, setLoading] = useState(false); // State to manage loading
  const [showAlert, setShowAlert] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handlePlaceOrder = () => {
    setLoading(true);
    setProgress(30); // Update progress

    // Simulate a delay for processing the order
    setTimeout(() => {
      setProgress(100); // Update progress to 100%
      setLoading(false); // Hide the loader
      setShowAlert(true); // Show the alert
    }, 2000); // Simulate a 2-second delay
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="relative mx-auto w-full bg-white">
      {loading && <Loader />} {/* Conditionally render the Loader */}
      {showAlert && <Alert message="Your order has been successfully placed!" onClose={handleAlertClose} />} {/* Conditionally render the Alert */}

      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Secure Checkout
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <Formik
  initialValues={{
    email: '',
    cardNumber: '',
    month: '',
    year: '',
    securityCode: '',
    cardName: '',
  }}
  validationSchema={validationSchema}
  onSubmit={handlePlaceOrder}
>
  {({ isSubmitting }) => (
    <Form className="mt-10 flex flex-col space-y-4">
      <div>
        <label htmlFor="email" className="text-xs font-semibold text-gray-500">Email</label>
        <Field type="email" id="email" name="email" placeholder="john.capler@fang.com" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
        <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
      </div>
      <div className="relative">
        <label htmlFor="cardNumber" className="text-xs font-semibold text-gray-500">Card number</label>
        <Field type="text" id="cardNumber" name="cardNumber" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
        <ErrorMessage name="cardNumber" component="div" className="text-red-600 text-sm mt-1" />
        <img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" className="absolute bottom-3 right-3 max-h-4" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500">Expiration date</p>
        <div className="mr-6 flex flex-wrap">
          <div className="my-1">
            <label htmlFor="month" className="sr-only">Select expiration month</label>
            <Field as="select" name="month" id="month" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
              <option value="">Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Field>
            <ErrorMessage name="month" component="div" className="text-red-600 text-sm mt-1" />
          </div>
          <div className="my-1 ml-3 mr-6">
            <label htmlFor="year" className="sr-only">Select expiration year</label>
            <Field as="select" name="year" id="year" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
              <option value="">Year</option>
              {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Field>
            <ErrorMessage name="year" component="div" className="text-red-600 text-sm mt-1" />
          </div>
          <div className="relative my-1">
            <label htmlFor="securityCode" className="sr-only">Security code</label>
            <Field type="text" id="securityCode" name="securityCode" placeholder="Security code" className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
            <ErrorMessage name="securityCode" component="div" className="text-red-600 text-sm mt-1" />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="cardName" className="sr-only">Card name</label>
        <Field type="text" id="cardName" name="cardName" placeholder="Name on the card" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
        <ErrorMessage name="cardName" component="div" className="text-red-600 text-sm mt-1" />
      </div>
      <div className="relative mt-4">
        <div className="relative h-1 bg-gray-200 rounded">
          <div style={{ width: `${progress}%` }} className="absolute top-0 left-0 h-full bg-teal-600 rounded transition-all duration-500"></div>
        </div>
        <p className="mt-2 text-xs font-semibold text-gray-500">
          {progress === 0 ? 'Starting checkout...' : progress === 100 ? 'Order Confirmed' : `Processing... ${progress}%`}
        </p>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
      >
        Place Order
      </button>
    </Form>
  )}
</Formik>

            <p className="mt-10 text-center text-sm font-semibold text-gray-500">
              By placing this order you agree to the <Link to="#" className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</Link>
            </p>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <div className="inline-flex">
                      <img src={item.img} alt={item.name} className="max-h-16" />
                      <div className="ml-3">
                        <p className="text-base font-semibold text-white">{item.name}</p>
                        <p className="text-sm font-medium text-white text-opacity-80">{item.text}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white">${item.totalPrice.toFixed(2)}</p>
                  </li>
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
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-sm font-medium text-white">
                <span>Vat: 10%</span>
                <span>${(totalPrice * 0.10).toFixed(2)}</span>
              </p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="text-sm font-semibold">+92 333 9167909 </p>
            <p className="mt-1 text-sm font-semibold">abdul.wasay308@gmail.com </p>
            <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
