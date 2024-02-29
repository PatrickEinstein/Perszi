import React, { useEffect, useState } from "react";
import SimpleSnackbar from "../Components/Snackbar";
import { Stack, Typography } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import PostCaller from "../Hooks/PostCaller";
import TransitionsModal from "../Components/modal";
import MyButtons from "../Components/Button";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Login = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  console.log(email, password)

  const OnClick = async () => {
    const User = PostCaller("user/login", {
      email: email,
      securepass: password,
    });
    const calledUser = await User;
    // console.log(calledUser);
    if (calledUser.success === true) {
    } else {
    }
  };

  return (
    <Stack spacing={3}>
      <SimpleSnackbar open={open} handleClose={handleClose} message={message} />
      <Stack
        direction={isNonMobileScreen ? "row" : "column"}
        justifyContent="space-between"
      >
        <Typography
          fontSize={12}
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            color: "black",
            fontSize: 18,
          }}
        >
          Login with Email and Password
        </Typography>
        <Typography
          fontSize={12}
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            color: "blue",
            fontSize: 18,
          }}
          onClick={() => navigate("/reset")}
        >
          Forgot your password ?
        </Typography>
      </Stack>

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        placeholder="Enter your first name"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        placeholder="Enter password name"
        onChange={(e) => setPassword(e.target.value)}
      />

      <MyButtons text="Login" onClick={OnClick} />
    </Stack>
  );
};

const LoginModal = () => {
  return <TransitionsModal body={Login()} />;
};

export default LoginModal;
