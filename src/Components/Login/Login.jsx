import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/slices/authSlice";

const Login = () => {
  const initialState = {
    name: "",
    password: "",
  };
  const [values, setValues] = useState(initialState);
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Card className="w-96 bg-gray-800 border border-teal-500 rounded-lg shadow-lg">
        <CardHeader
          variant="gradient"
          color="teal"
          className="mb-4 grid h-24 place-items-center rounded-t-lg"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-6">
          <Input
            label="Name"
            size="lg"
            type="text"
            name="name"
            value={values.name}
            onChange={onChange}
            className="bg-gray-900 text-white border-teal-500"
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
            className="bg-gray-900 text-white border-teal-500"
          />
        </CardBody>
        <CardFooter className="pt-0 px-6 pb-6">
          <Button
            variant="gradient"
            fullWidth
            color="teal"
            onClick={() => dispatch(login(values))}
            className="hover:bg-teal-700"
          >
            Sign In
          </Button>
       
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
