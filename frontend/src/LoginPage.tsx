import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as dotenv from "dotenv";

interface LoginPageProps {
  onAllowAccess: (allow: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onAllowAccess }) => {
  const [fade, setFade] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [pwd, setPwd] = useState<string>("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(ev.target.value);
  };

  const password = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (pwd === import.meta.env.VITE_TFOA_SITEPASSWORD) {
      const currentTime = new Date().getTime();
      const accessData = {
        allowed: true,
        timestamp: currentTime,
      };
      localStorage.setItem("accessData", JSON.stringify(accessData));
      setFade(true);
      setTimeout(() => {
        onAllowAccess(true);
      }, 1000);
    } else {
      setErrorMessage("Password incorrect. Please try again or contact the website administrator");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const containerStyle: React.CSSProperties = {
    width: "80%",
    height: "50px",
    display: "flex",
    margin: "4rem auto",
    textAlign: "center",
    justifyContent: "center",
    opacity: fade ? 0 : 1,
    transition: "opacity 1s ease-out",
  };

  return (
    <>
      <div style={containerStyle}>
        <form onSubmit={password} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <TextField
            id="filled-password-input"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={pwd}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button type="submit" className="lets-go" style={{ minHeight: "50px", fontSize: "20px" }}>
            Let's Go!
          </button>
        </form>
      </div>
      <div style={{ height: "40px", width: "400px" }}>
        {errorMessage && <div style={{ color: "darkred", fontSize: "16px", textAlign: "center" }}>{errorMessage}</div>}
      </div>
    </>
  );
};

export default LoginPage;
