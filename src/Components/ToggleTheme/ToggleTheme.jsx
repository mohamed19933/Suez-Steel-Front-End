import { HandleMode } from "../../Redux";
import { useDispatch } from "react-redux";
import "./ToggleTheme.css";

const ToggleTheme = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="dark_mode">
        <input
          className="dark_mode_input"
          type="checkbox"
          id="darkmode-toggle"
          onChange={() => HandleMode(dispatch)}
        />
        <label className="dark_mode_label" htmlFor="darkmode-toggle">
          <img
            alt="moon"
            src="/assets/icons/Moon.svg"
            style={{ right: "5px" }}
          />

          <img alt="sun" src="/assets/icons/Sun.svg" style={{ left: "5px" }} />
        </label>
      </div>
    </>
  );
};

export default ToggleTheme;
