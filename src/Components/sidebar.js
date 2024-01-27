import react from "react";
import { ReactDOM } from "react";
import { MenuList } from "./SideBarItems";
import { Auth } from "./SideBarItems";
import { IconButton, Stack, ToggleButton } from "@mui/material";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setProfileIndex } from "../Redux/reducer";
const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <Stack
      justifyContent="space-between"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        sx={{
          padding: 3,
          overflow: "hidden",
        }}
      >
        {MenuList.map(({ title, logo }) => (
          <Stack justifyContent="space-between" flexDirection="row">
            <Stack direction="row" spacing={0}>
              <IconButton>{logo}</IconButton>
              <IconButton onClick={() => dispatch(setProfileIndex(title))}>
                <Typography
                  sx={{
                    padding: 1,
                  }}
                >
                  {title}
                </Typography>
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Stack
        spacing="3"
        sx={{
          padding: 3,
          overflow: "hidden",
        }}
      >
        {Auth.map(({ logo, title }) => (
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row">
              <IconButton>{logo}</IconButton>
              <IconButton onClick={() => dispatch(setProfileIndex(title))}>
                <Typography
                  sx={{
                    padding: 1,
                  }}
                >
                  {title}
                </Typography>
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Sidebar;
