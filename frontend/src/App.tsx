// React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// Component Imports
import Home from "./Home";
import LoginPage from "./LoginPage";
import CouponCodeTester from "./Coupon-Code-Tester";

interface State {
  auth: any; // Specify a more detailed type based on what `auth` actually is
}

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state: State) => state.auth);

  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(false);

  useEffect(() => {
    const savedData = localStorage.getItem("accessData");
    if (savedData) {
      const { allowed, timestamp } = JSON.parse(savedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 30 * 60 * 1000) {
        setFade(true);
        setTimeout(() => {
          setIsAllowed(allowed);
        }, 1000);
      } else {
        localStorage.removeItem("accessData");
        setIsAllowed(false);
      }
    }
  }, []);

  return (
    <>
      {!isAllowed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: fade ? "none" : "blur(20px)",
            WebkitBackdropFilter: fade ? "none" : "blur(20px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            transition: "backdrop-filter 1s ease-in-out, -webkit-backdrop-filter 1s ease-in-out",
          }}
        >
          <LoginPage onAllowAccess={setIsAllowed} />
        </div>
      )}

      <div id="background-image">
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, margin: "0", padding: "0" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<LoginPage />} /> */}
              <Route path="/coupons" element={<CouponCodeTester />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
