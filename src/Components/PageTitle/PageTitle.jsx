import React from "react";
import styles from "./PageTitle.module.css";

const PageTitle = ({ Title }) => {
  return (
    <div className={styles.containerDiv}>
      <h2 className={`${styles.pageTitleh2} mt-7`}>{Title}</h2>
    </div>
  );
};

export default PageTitle;
