import React, { useState } from "react";
import DatePicker from "react-datepicker";


const DateRangeFilter = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateRangeChange = () => {
    // Send the selected date range to the parent component
    onDateRangeChange({ startDate, endDate });
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className={ThemeModeLight ? "teal" : "bg-dark"}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className={ThemeModeLight ? "teal" : "bg-dark"}
      />
      <button onClick={handleDateRangeChange}>Apply</button>
    </div>
  );
};

export default DateRangeFilter;
