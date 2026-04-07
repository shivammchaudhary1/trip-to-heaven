import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/loader/Loader";
import PublicRoute from "./PublicRoute";

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
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forget-password"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flights" element={<Flights />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
