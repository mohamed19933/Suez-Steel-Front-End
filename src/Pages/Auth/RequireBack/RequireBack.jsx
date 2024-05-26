import React from "react";
import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";

const RequireBack = () => {
  const cookie = Cookie();
  const token = cookie.get("Token");


  //If there is token then return back to the page not go to register or login
  return token ? window.history.back() : <Outlet />;
};

export default RequireBack;
