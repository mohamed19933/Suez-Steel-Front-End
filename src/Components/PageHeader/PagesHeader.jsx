import React from "react";
import { PageTitle, Data } from "../index";
import { NavLink } from "react-router-dom";

const PagesHeader = ({ Title, AddButtonStatus, NavigateTo, ButtonTitle }) => {
  return (
    <>
      <PageTitle Title={Title} />
      {AddButtonStatus && (
        <div className="">
          <NavLink to={NavigateTo} style={{ textDecoration: "none" }}>
            <Data.Button
              variant="contained"
              startIcon={<Data.AddCircleOutlineIcon />}
            >
              {ButtonTitle}
            </Data.Button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default PagesHeader;
