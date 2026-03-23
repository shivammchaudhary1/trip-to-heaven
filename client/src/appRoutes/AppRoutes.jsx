import { Routes, Route } from "react-router-dom";
import Home from "../modules/home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>
  );
};

export default AppRoutes;
