import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../HomePage/Home";
import About from "../HomePage/About";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
