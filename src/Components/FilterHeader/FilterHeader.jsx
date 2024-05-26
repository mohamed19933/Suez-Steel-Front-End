import React from "react";
import { Data } from "../MaterialUI/OrganzieData";
import styles from "./FilterHeader.module.css";
const FilterHeader = ({ Title }) => {
  return (
    <Data.Box gridColumn="span 12" className={styles.filterHeader}>
      <h1 className={styles.filterNameHeader}>{Title}</h1>
    </Data.Box>
  );
};

export default FilterHeader;
