import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { userUrl, Axios } from "../../../Api";
import { HashLoad } from "../../../Components";
import Err403 from "../403/Err403";

export default function RequireAuth({ allowedRole }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const cookie = Cookie();
  const token = cookie.get("Token");

  useEffect(() => {
    Axios.get(userUrl)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, [token]);

  return token ? (
    user === "" ? (
      <HashLoad />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
