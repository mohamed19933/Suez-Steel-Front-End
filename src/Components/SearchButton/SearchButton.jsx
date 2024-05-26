import React from "react";
import { Data } from "../index.js";
import styles from "./SearchButtons.module.css"; // Adjust the path accordingly

const SearchButton = ({ handleButtonClick ,title}) => {
  return (
    <Data.LoadingButton
      variant="contained"
      className={styles.buttonSearchStyle}
      onClick={handleButtonClick}
    >
      {title}
    </Data.LoadingButton>
  );
};

export default SearchButton;
