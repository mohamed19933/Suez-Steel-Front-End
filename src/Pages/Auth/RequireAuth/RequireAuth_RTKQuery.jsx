import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetDataQuery } from "../../../Redux";
import { HashLoad } from "../../../Components";
import { userUrl } from "../../../Api";
export default function RequireAuth() {
  const { data, error, isLoading } = useGetDataQuery(userUrl);
  const navigate = useNavigate();

  if (isLoading) {
    return <HashLoad />;
  }

  if (error) {
    console.error("Error fetching user:", error);
    navigate("/login");
    return null;
  }
  console.log(data);
  return <Outlet />;
}
