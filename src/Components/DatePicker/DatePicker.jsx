// DatePickerComponent.js

import React from "react";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import InputIcon from "react-multi-date-picker/components/input_icon";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import styles from "./DatePicker.module.css";
import { useSelector } from "react-redux";
import { callingRedux } from "../../Redux";

const CustomDatePicker = ({
  dates,
  setDates,
  formattedCurrentDate,
  format,
  dateSeparator,
  placeholder,
  render,
}) => {
  const { ThemeModeLight } = useSelector(callingRedux);

  return (
    <DatePicker
      format={format}
      dateSeparator={dateSeparator}
      value={dates}
      range
      animations={[transition()]}
      className={ThemeModeLight ? "teal" : "bg-dark"}
      plugins={[
        <TimePicker
          position="bottom"
          hideSeconds
          style={{ minWidth: "100px" }}
        />,
        <DatePanel markFocused />,
      ]}
      numberOfMonths={2}
      minDate="01-01-2023"
      maxDate={formattedCurrentDate}
      onChange={setDates}
      hideOnScroll
      inputClass={styles.customInput}
      placeholder={placeholder}
        render={render && <InputIcon />}


    />
  );
};

export default CustomDatePicker;
