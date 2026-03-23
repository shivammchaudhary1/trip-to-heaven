import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/loader/Loader";

const Home = lazy(() => import("../modules/home/Home"));
const Register = lazy(() => import("../components/auth/Register"));
const Login = lazy(() => import("../components/auth/Login"));
const ForgetPassword = lazy(() => import("../components/auth/ForgetPassword"));
const Hotels = lazy(() => import("../modules/hotel/Hotels"));
const Flights = lazy(() => import("../modules/flights/Flights"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flights" element={<Flights />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
