// BaseLayout.js
import { Outlet } from "react-router-dom";
import { Sidebar, Topbar } from "../Components";
import { useSelector } from "react-redux";
import { callingRedux } from "../Redux";
import styles from "./BaseLayout.module.css";

const BaseLayout = () => {
  const { ThemeModeLight } = useSelector(callingRedux);

  return (
    <main
      className={(ThemeModeLight ? "lightMode" : "darkMode") + " page-wrapper"}
    >
      <Topbar />
      <div className={styles.mainpage}>
      
        {/* left of page */}
        <Sidebar />

        {/* right side/content of the page */}
        <div className={`${styles.contentwrapper} ${styles.bgGeneral}`}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default BaseLayout;
