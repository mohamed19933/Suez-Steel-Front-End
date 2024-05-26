import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import styles from "./styles.module.css";

export default function DateTimePickerMui({ dates, setDates }) {
  const handleFromDateChange = (newDate) => {
    setDates([newDate, dates[1]]);
    // If toDate is set and it's before the new from date, update toDate to null
    if (dates[1] && dates[1].isBefore(newDate)) {
      setDates([newDate, null]);
    }
  };

  const handleToDateChange = (newDate) => {
    setDates([dates[0], newDate]);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} className={styles.FRFRT}>
        {/* <DemoContainer components={["DateTimePicker", "DateTimePicker"]} className={styles.FRFRT}> */}
          <DateTimePicker
            className={styles.dateTimeStyle}
            label="From"
            value={dates[0]}
            onChange={handleFromDateChange}
            maxDate={dates[1]}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            format="DD/MM/YYYY hh:mm a"
          />

          <DateTimePicker
            className={styles.dateTimeStyle}
            label="To"
            value={dates[1]}
            onChange={handleToDateChange}
            minDate={dates[0]}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            format="DD/MM/YYYY hh:mm a"
          />
        {/* </DemoContainer> */}
      </LocalizationProvider>
    </>
  );
}
