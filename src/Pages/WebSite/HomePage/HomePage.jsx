import React from "react";
import { Data, PageTitle, FilterHeader } from "../../../Components";

import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <PageTitle Title="Home Page" />

      <Data.Box
        sx={{ width: 0.98 }}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        className={styles.overAllFilter}
      >
        <FilterHeader Title="Home Filter" />

        {/* Body of the Filter Region  */}
        <Data.Box gridColumn="span 12" className={styles.filterContent}>
          <h1>First Filter</h1>
          <h2>Second Fitler</h2>
          <Data.Button>Search</Data.Button>
        </Data.Box>
      </Data.Box>
    </>
  );
};

export default HomePage;
