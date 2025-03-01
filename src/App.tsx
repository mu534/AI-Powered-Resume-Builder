import { Routes, Route } from "react-router";
import Home from "./HomePage/Home";

import Resume from "./components/Resume";
import SignIn from "./HomePage/Signin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUp from "./HomePage/SignUp ";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="598605355815-0fi7891f8fvr04ur6hcjuv7qrld1c5gp.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Resume" element={<Resume />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
