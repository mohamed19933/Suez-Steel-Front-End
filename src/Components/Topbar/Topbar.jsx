import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { callingRedux } from "../../Redux";
import { Data } from "../index";
import styles from "./Topbar.module.css";
import SuezSteelLogo from "./suezsteel.ico"

const settings = [
  { label: "Profile", path: "/profile" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Logout", path: "/login" },
];

const Topbar = () => {
  const { isDrawerOpen, user } = useSelector(callingRedux);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    Cookie().remove("Token");
    console.log("Press Me");
  };

  return (
    <Data.AppBar position="static" className={styles.Headercss}>
      <Data.Toolbar
        style={{
          marginLeft: isDrawerOpen ? "250px" : "60px",
          transition: "margin-left 0.2s ease-out",
        }}
      >
             <img src={SuezSteelLogo} alt="Suez Steel Logo" className={styles.logo} />
        <Data.Typography
          variant="h1"
          component="h1"
          sx={{ flexGrow: 1 }}
          className={styles.Iconcss}
        >
          Suez Steel Co.
        </Data.Typography>
      </Data.Toolbar>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent:"center" }}>
      <Data.Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Data.IconButton
    size="large"
    edge="end"
    color="inherit"
    aria-label="menu"
  >
    <ToggleTheme />
  </Data.IconButton>
</Data.Toolbar>


        {/* <Data.Box>
          <Data.IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Data.Avatar sx={{ bgcolor: Data.deepPurple[500] }}>
              {user ? user.slice(0, 2).toUpperCase() : ""}
            </Data.Avatar>
          </Data.IconButton>

          <Data.Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <Link
                to={setting.path} // Use the path provided in the settings
                key={setting.label}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Data.MenuItem
                  onClick={
                    setting.label === "Logout"
                      ? handleLogout
                      : handleCloseUserMenu
                  }
                >
                  <Data.Typography textAlign="center">
                    {setting.label}
                  </Data.Typography>
                </Data.MenuItem>
              </Link>
            ))}
          </Data.Menu>
        </Data.Box> */}
      </div>
    </Data.AppBar>
  );
};

export default Topbar;
