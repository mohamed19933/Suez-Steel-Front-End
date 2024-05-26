import { area, crews, shifts } from "../Constants/Constants"; // Import the area, crews, and shifts arrays

const exportUrl = (runURL,dates, filters) => {
  let startDate = "";
  let endDate = "";
  let newUrl = `${runURL}`;

  if (!dates || dates.length !== 2 || !dates[0] || !dates[1]) {
    console.log("Dates are empty or incomplete");
  } else {
    // startDate = dates[0].format("YYYY-MM-DD HH:mm");
    // endDate = dates[1].format("YYYY-MM-DD HH:mm");
    startDate = dates[0]
      .format("YYYY-MM-DD HH:mm")
      .replace(/ /g, "%20")
      .replace(/:/g, "%3A");

    endDate = dates[1]
      .format("YYYY-MM-DD HH:mm")
      .replace(/ /g, "%20")
      .replace(/:/g, "%3A");

    newUrl = newUrl + `?start=${startDate}&stop=${endDate}`;
  }

  // Validate filters.Area
  if (area.some((areaItem) => areaItem.value === filters.Area)) {
    newUrl = newUrl + "&area=" + filters.Area;
  } else {
    console.error("Invalid Area value provided in filters.");
  }

  // Validate filters.Crew
  if (crews.some((crewItem) => crewItem.value === filters.Crew)) {
    newUrl = newUrl + "&crew=" + filters.Crew;
  } else {
    console.error("Invalid Crew value provided in filters.");
  }

  // Validate filters.Shift
  if (shifts.some((shiftItem) => shiftItem.value === filters.Shift)) {
    newUrl = newUrl + "&shift=" + filters.Shift;
  } else {
    console.error("Invalid Shift value provided in filters.");
  }

  return newUrl;
};

export default exportUrl;
