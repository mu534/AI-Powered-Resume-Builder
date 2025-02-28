import { Routes, Route } from "react-router";
import Home from "./HomePage/Home";

import Resume from "./components/Resume";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Resume" element={<Resume />} />
      </Routes>
    </>
  );
}

export default App;
