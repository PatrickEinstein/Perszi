import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/p1.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Stack } from "@mui/material";
import { faker } from "@faker-js/faker";
import { toggleopenModal, toggleopenModal2 } from "../Redux/reducer";
import {
  Dashboard,
  Notifications,
  AddTask,
  HourglassBottom,
  FileDownloadDone,
  AdminPanelSettingsRounded,
} from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";

import { setProfileIndex } from "../Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import Mainboard from "./mainboard";

import { useNavigate } from "react-router-dom";
import MyButtons from "./Button";
import { setLoggedInUser } from "../Redux/roleReducer";
import { Archive,  UserCircle } from "phosphor-react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    background: "white",
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    //
    width: `calc(20% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  background: "transparent",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  // display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Drawer2() {
  const theme = useTheme();
  const navigate = useNavigate();

  // console.log({openModal, openModal2})
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const userRoles = useSelector((state) => state.app.Role.loggedInUser);
  const userInfo = useSelector((state) => state.app.Role.userInfo);
 
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const HandleLogout = () => {
    dispatch(setLoggedInUser(["X", "X", "X", "X"]));
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}> */}
      <Toolbar>
        <IconButton
          color="green"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: 2,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon color="green" />
        </IconButton>
      </Toolbar>
      {/* </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          // flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{
            opacity: 0.8,
          }}
        >
          <img
            src={Logo}
            alt=""
            style={{
              width: "auto",
              height: 50,
              objectFit: "cover",
              marginLeft: "10%",
              paddingTop: 10,
              paddingLeft: 10,
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              paddingTop: 5,
            }}
          >
            <div>
              <UserCircle
                style={{
                  fontSize:'50px'
                }}
              />
              <Typography
                sx={{
                  paddingTop: 1,
                  fontWeight: "bold",
                }}
              >
                {userInfo.username} {userInfo.email}
              </Typography>
            </div>
            <IconButton>
              <PublicIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
            <IconButton>
              <Notifications
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Stack>
          <List>
            {[
              userRoles[0] !== "X" && {
                text: "Create Project",
                icon: <AddTask />,
              },
              userRoles[1] !== "X" && {
                text: "Ongoing Project",
                icon: <HourglassBottom />,
              },
              userRoles[2] !== "X" && {
                text: "Project Result",
                icon: <FileDownloadDone />,
              },
              // { text: "Dashboard", icon: <Dashboard /> },
              userRoles[3] !== "X" && {
                text: "Administrator",
                icon: <AdminPanelSettingsRounded />,
              },
              { text: "Archived", icon: <Archive /> },
            ].map(({ text, icon }, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => dispatch(setProfileIndex(text))}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "black",
                      fontFamily: "sofia, sans-serif",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      color: "black",
                      fontFamily: "sofia, sans-serif",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Stack justifyContent="centre" alignItems="center" height="3rem">
            <MyButtons
              text="Logout"
              height={100}
              width="100%"
              onClick={HandleLogout}
            />
          </Stack>
        </Box>
      </Drawer>
      <Main open={open}>
        <Mainboard />
      </Main>
    </Box>
  );
}
