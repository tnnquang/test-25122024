import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import DetailPage from "../pages/detail";

const NotFound = () => {
  return (
    <div className="py-40">
      <p className="text-xl font-semibold text-white text-center">
        Page not found. Please check
      </p>
    </div>
  );
};

export default function RouteConfigures() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:slug" element={<DetailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
