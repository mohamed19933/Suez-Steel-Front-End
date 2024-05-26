import React  from "react";
import { NavLink } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { HandleDrawer, callingRedux } from "../../Redux";
import styles from "./Sidebar.module.css";
import { Data, drawerWidth, sidenavbarElements } from "../index";



const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: "var(--secondary-color) !important",
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "var(--secondary-color) !important",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerComponent = styled(MuiDrawer, {
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

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isDrawerOpen } = useSelector(callingRedux);


  const handleDrawerClose = () => {
    HandleDrawer(dispatch);
  };

  

  return (
    <DrawerComponent variant="permanent" open={isDrawerOpen}>
      <DrawerHeader style={{ zIndex: isDrawerOpen ? 999 : 0 }}>
        <Data.IconButton
          onClick={handleDrawerClose}
          style={{ display: isDrawerOpen ? "block" : "none" }}
          className={styles.textColor}
        >
          <Data.ChevronLeftIcon />
        </Data.IconButton>
        <Data.IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => HandleDrawer(dispatch)}
          style={{ display: isDrawerOpen ? "none" : "block", zIndex: 999 }}
        >
          <Data.MenuIcon className={styles.textColor} />
        </Data.IconButton>
      </DrawerHeader>
      <Data.Divider />
      <Data.List>
        {sidenavbarElements.map((item) => (
          <NavLink to={item.path} key={item.id} className={styles.textColor}>
            <Data.ListItem disablePadding>
              <Data.ListItemButton className={styles.textColor}>
              <Data.ListItemIcon className={styles.Iconcss}>
                  {item.icon } 
                </Data.ListItemIcon>
                <Data.ListItemText
                  primary={item.name}
                  className={styles.textColor}
                />
              </Data.ListItemButton>
            </Data.ListItem>
          </NavLink>
        ))}
      </Data.List>
      <Data.Divider />
    </DrawerComponent>
  );
};

export default Sidebar;
