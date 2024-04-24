// React Imports
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  return (
    <div>
      HEYO IT WORKS
      <br />
      <Link to={"/coupons"}>Coupon Code Tester</Link>
    </div>
  );
}

export default Home;
