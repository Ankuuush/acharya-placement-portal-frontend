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
import navApplied from "../Assets/navApplied.png";
import navContactUs from "../Assets/navContactUs.png";
import navExplore from "../Assets/navExplore.png";
import navFeedback from "../Assets/navFeedback.png";
import navResume from "../Assets/navResume.png";
import profilePic from "../Assets/ProfilePic.png";
import { Divider } from "@mui/material";
import AuthContext from "../Context/AuthContext/AuthContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navIcons = [
    navExplore,
    navApplied,
    navResume,
    navFeedback,
    navContactUs,
  ];

  const authContext = useContext(AuthContext)
  const {currentUser}=authContext
  const navigate=useNavigate()

  const handleClick=(text)=>{
    switch(text){
      case "Explore Jobs":navigate('/student/explore-jobs')
                          break;
      case "Applied Jobs":navigate('/student/applied-jobs')
                          break;
      case "Build Resume":navigate('/student/resume')
                          break;
      case "Feedback":navigate('/feedback')
                      break;
      case "Contact Us":navigate('/contact-us')
                        break;
      default:navigate('/student/explore-jobs')
    }
  }

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
      <Drawer variant="permanent" open={open} >
        <DrawerHeader style={{ height: "4.5rem" }}>
          <IconButton onClick={handleDrawerClose} style={{ padding: "0" }}>
            {theme.direction === "rtl" ? (
              //   <ChevronRightIcon />
              <></>
            ) : (
              //   <ChevronLeftIcon />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={logo}
                  alt="logo"
                  className="collegeIcon"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    marginRight: "0.7rem",
                  }}
                />
                <p style={{color:"black"}}>Placement Cell</p>
              </div>
            )}
          </IconButton>
        </DrawerHeader>
        <List sx={{height:"100vh"}}>
          {[
            "Explore Jobs",
            "Applied Jobs",
            "Build Resume",
            "Feedback",
            "Contact Us",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }} onClick={()=>handleClick(text)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
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
                  <img src={navIcons[index]} alt={text} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ fontWeight:"bold", opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ display:"block", position:"absolute", bottom:"0" }}>
          <Divider/>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
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
                  <img src={profilePic} alt="profile pic" style={{width:"3rem",height:"3rem"}}/>
                </ListItemIcon>
                <div style={{display:"flex", flexDirection:"column"}}>
                <ListItemText primary={currentUser.displayName} sx={{display:open?"":"none", opacity: open ? 1 : 0 }} />
                <ListItemText primary="1AY19IS012" sx={{display:open?"":"none", opacity: open ? 1 : 0 }} />
                </div>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </>
  );
}
