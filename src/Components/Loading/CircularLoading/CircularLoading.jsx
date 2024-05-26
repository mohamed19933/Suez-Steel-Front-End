import React from "react";
import Data from "../../OrganzieData";

const CircularLoading = () => {
  return (
    <Data.Box sx={{ display: "flex" }}>
      <Data.CircularProgress />
    </Data.Box>
  );
};

export default CircularLoading;
