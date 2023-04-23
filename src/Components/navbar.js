import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../Assets/Acharya_logo.png";
import profilePic from "../Assets/ProfilePic.png";
import { Divider } from "@mui/material";
import AuthContext from "../Context/AuthContext/AuthContext";
import { useContext } from "react";
import PlacementLogoSmall from "./Logo/PlacementLogoSmall";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "white",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    display: "none",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar({account,menu, setComponent, currentComponent }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const authContext = useContext(AuthContext);
  let navigate = useNavigate();
  const { currentUser, logout } = authContext;

  const handleClick = (code) => {
    setComponent(code);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          boxShadow: "none",
          borderRight: "1px solid #e0e0e0",
          left: "0",
          overflowX: "hidden",
          width: `calc(${theme.spacing(7)} + 1px)`,
          [theme.breakpoints.up("sm")]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
          },
          height: "4.5rem",
        }}
      >
        <Toolbar style={{ padding: "0" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              margin: "0 auto",
              ...(open && { display: "none" }),
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="collegeIcon"
              style={{ width: "3rem", height: "3rem" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader style={{ borderBottom: "1px solid #e0e0e0" }}>
          <IconButton onClick={handleDrawerClose} style={{ padding: 0 }}>
            {theme.direction === "rtl" ? (
              <></>
            ) : (
              <PlacementLogoSmall />
            )}
          </IconButton>
        </DrawerHeader>

        <List sx={{ height: "100vh" }}>
          {menu.map((item) => (
            <ListItem
              key={item.code}
              disablePadding
              sx={{
                display: "block",
                backgroundColor: currentComponent === item.code && "#eceef9",
                borderRight: currentComponent === item.code && "5px solid #1f357e",
              }}
              onClick={() => handleClick(item.code)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <FeatherIcon
                    icon={item.icon}
                    color="#213780"
                    style={{ marginRight: open ? 20 : 0 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ fontWeight: "bold", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem
            key={"logout"}
            disablePadding
            sx={{ display: "block", backgroundColor: "" }}
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <FeatherIcon
                  icon={"log-out"}
                  color="#213780"
                  style={{ marginRight: open ? 20 : 0 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                sx={{ fontWeight: "bold", opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block", position: "absolute", bottom: "0" }}
          >
            <div style={{ backgroundColor: "#fadab7", textAlign: "center" }}>
              {open && (
                <p style={{ color: "#ee8311", margin: 0, fontWeight: "bold" }}>
                  {account}
                </p>
              )}
            </div>
            <Divider />
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                backgroundColor: "#213780",
                color: "white",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  src={localStorage.getItem("avatar") || profilePic}
                  alt="profile pic"
                  style={{ width: "3rem", height: "3rem", borderRadius: 1000 }}
                />
              </ListItemIcon>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ListItemText
                  primary={currentUser.displayName}
                  sx={{ display: open ? "" : "none", opacity: open ? 1 : 0 }}
                />
                <ListItemText
                  primary={localStorage.getItem("usn") || ""}
                  sx={{ display: open ? "" : "none", opacity: open ? 1 : 0 }}
                />
              </div>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
