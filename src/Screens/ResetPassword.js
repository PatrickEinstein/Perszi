import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { setMessage, setOpen } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import {PatchCaller} from "../Hooks/PatchCaller"
import PostCaller from "../Hooks/PostCaller";
import { Details } from "../Components/Details";
import { useMediaQuery } from "@mui/material";
;

const ForgetPassword = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [change, setChange] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState();
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // console.log(email, otp, password);

  const onChangeEmail = async () => {
    setChange(2);
  };

  const onChangePassword = async () => {
    try {
      const submit = PatchCaller(
        {
          email: email,
          password: password,
        },
        "resetpass"
      );
      const submitted = await submit;
      if (submitted.success === true) {
        // dispatch(setOpen(true));
        // dispatch(setMessage(submitted.message));
        // setSubmitted(true);
      } else {
        // dispatch(setOpen(true));
        // dispatch(setMessage(submitted.message));
        return;
      }
    } catch (err) {
    //   dispatch(setOpen(true));
    }
  };

  const VerifyOtp = async (e) => {
    try {
      const submit = PostCaller(
        {
          email: email,
          otp: otp,
        },
        "verify"
      );
      const submitted = await submit;
      // console.log(submitted);
      if (submitted.success === true) {
        // dispatch(setOpen(true));
        // dispatch(setMessage(submitted.message));
        setChange(2);
      } else {
        // dispatch(setOpen(true));
        // dispatch(setMessage(submitted.message));
        return;
      }
    } catch (err) {
    //   dispatch(setOpen(true));
    }
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      sx={{
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      {(() => {
        switch (change) {
          case 0:
            return (
              <Details
                label="email"
                value={email}
                placeholder="example@example.com"
                onChange={(e) => setEmail(e.target.value)}
                onClick={onChangeEmail}
                text="Please enter your registered email address"
                change={change}
                setChange={setChange}
              />
            );
          case 1:
            return (
              <Details
                label="OTP"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                onClick={VerifyOtp}
                text="Now provide your OTP here"
                change={change}
                setChange={setChange}
              />
            );
          case 2:
            return (
              <Details
                label="New password"
                placeholder="my favourite car"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={onChangePassword}
                text={submitted ? null : "Enter a new password"}
                change={change}
                submitted={submitted}
                setChange={setChange}
              />
            );
          default:
            return null;
        }
      })()}
    </Box>
  );
};

export default ForgetPassword;
