import { IconButton, Stack, TextField, Typography } from "@mui/material";
import MyButtons from "./Button";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
export const Details = ({
  onClick,
  label,
  text,
  onChange,
  placeholder,
  value,
  change,
  setChange,
  onChangeEmail,
  submitted,
}) => {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      spacing={5}
      sx={{
        width: "70%",
        background: "white",
        position: "absolute",
        paddingLeft: isNonMobileScreen ? 5 : 1,
        paddingRight: isNonMobileScreen ? 5 : 1,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "hidden",
      }}
      paddingTop={8}
      paddingBottom={8}
    >
      <Typography
        textAlign="center"
        sx={{
          fontWeight: "bold",
          whiteSpace: "wrap",
          color: "black",
          paddingLeft: isNonMobileScreen ? 3 : 2,
          paddingRight: isNonMobileScreen ? 3 : 2,
        }}
      >
        {text}
      </Typography>

      {submitted ? null : (
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          placeholder={placeholder}
          sx={{
            width: "90%",
          }}
          onChange={onChange}
          value={value}
        />
      )}
      <MyButtons
        text={submitted ? "Login" : "Submit"}
        onClick={submitted ? () => navigate("/login") : onClick}
        width="70%"
      />
      {change === 2 ? (
        <Stack direction="row" justifyContent="space-between">
          {/* <IconButton onClick={() => setChange(0)}>
            <ArrowLeft />
          </IconButton> */}
          <Stack direction="row">
            {/* <Typography
              sx={{
                fontsize: 8,
              }}
            >
              {" "}
              Login
            </Typography> */}
            {/* <IconButton onClick={() => navigate("/login")}>
              <ReplayOutlined />
            </IconButton> */}
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
};
