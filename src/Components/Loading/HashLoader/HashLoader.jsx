import React from "react";
import HashLoader from "react-spinners/HashLoader";

const HashLoad = () => {
  return (
    <HashLoader
      // sizeUnit={"px"}
      size={190}
      color={"#537895"}
      style={{ display: "flex" }}
      // loading={dataLoading}
    />
  );
};

export default HashLoad;
