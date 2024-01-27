import React, { useState } from "react";
import {
  BadgeMark,
  Box,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MyButtons from "./Button";
import TextBox from "./TextField";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser, setSelectedUser } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import Logo from "../assets/p1.png";
import HttpCaller from "./RepositoryService/ApiCaller";
import { useCallback } from "react";
import ToastNotification from "./Toast";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const onSignIn = useCallback(async () => {
    const user = HttpCaller(
      "user/login/",
      "POST",
      {
        email: email,
        securepass: password,
      },
      {
        "Content-Type": "application/json",
      }
    );
    const awaitedUser = await user;
    if (awaitedUser.success === true) {
      setMessage(awaitedUser.message);
      dispatch(
        setSelectedUser({
          id: awaitedUser.user.id,
          user_type: awaitedUser.user.user_type,
        })
      );
      dispatch(setLoggedInUser(awaitedUser.user.roles));
    } else {
      setMessage(awaitedUser.message);
      return;
    }
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        height: 800,
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "auto",
          width: "50%",
        }}
      >
        <img
          src={Logo}
          style={{
            objectFit: "contain",
            width: "80%",
            height: "100%",
            filter: "brightness(120%)",
          }}
        />
        <ToastNotification notification={message} />
      </Stack>

      <Stack
        spacing={3}
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="50%"
        sx={{
          background: "linear-gradient(to top, white, gold, #bdb76b)",
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontSize: 40,
          }}
        >
          Welcome Back, Sign in here!
        </Typography>

        <TextBox
          id="outlined-basic3"
          label="Email Address"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextBox
          id="outlined-basic"
          label="Enter Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <MyButtons
          text="Login"
          color="white"
          width="80%"
          height={60}
          onClick={onSignIn}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{
              color: "black",
              marginRight: 8,
            }}
          >
            <IconButton>
              <Checkbox />
            </IconButton>
            Remember me
          </Typography>

          <Typography
            sx={{
              color: "black",
              marginTop: 2,
              marginLeft: 8,
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>
      </Stack>
      {/* </Box> */}
    </Stack>
  );
};

export default SignIn;
