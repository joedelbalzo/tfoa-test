import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, fetchSubmittedCode, useDispatch } from "./store";

function CouponCodeTester() {
  const dispatch = useDispatch();

  const [code, setCode] = useState<string>("");
  const activeCode = useSelector((state: RootState) => state.codes.activeCode);
  const error = useSelector((state: RootState) => state.codes.error);

  const [activeCodeSuccessCode, setActiveCodeSuccessCode] = useState<boolean>();
  const [activeError, setActiveError] = useState<boolean>();

  const couponSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(fetchSubmittedCode(code));
  };

  useEffect(() => {
    if (activeCode) {
      setActiveCodeSuccessCode(true);
      const successTimeout = setTimeout(() => {
        setActiveCodeSuccessCode(false);
      }, 3000);
      return () => clearTimeout(successTimeout);
    }
  }, [activeCode]);

  useEffect(() => {
    if (error) {
      setActiveError(true);
      const errorTimeout = setTimeout(() => {
        setActiveError(false);
      }, 3000);
      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  return (
    <div className="coupon-code-tester">
      Test Coupon Codes
      <form onSubmit={couponSubmit}>
        <input value={code} onChange={(ev) => setCode(ev.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {activeCodeSuccessCode && <div>Code {activeCode} is active!</div>}
      {activeError && <div>Code is invalid or failed to fetch.</div>}
    </div>
  );
}

export default CouponCodeTester;
