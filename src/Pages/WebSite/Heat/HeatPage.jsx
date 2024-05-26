import Dashboard from "../Dashboard/Dashboard";
import { area, crews, shifts } from "../../../Components";

const HeatPage = () => {
  const numFields = 5;
  const fieldTypes = [
    "SelectBox",
    "TextBox",
    "SelectBox",
    "TextBox",
    "SelectBox",
  ];
  const fieldLabels = ["Area", "Field 4", "Crew", "Field 5", "Shift"];
  const fieldValues = ["", "", "", "", ""];
  const onChangeHandlers = [
    (e) => console.log("Area value changed:", e.target.value),
    (e) => console.log("Crew value changed:", e.target.value),
    (e) => console.log("Shift value changed:", e.target.value),
    (e) => console.log("Field 4 value changed:", e.target.value),
    (e) => console.log("Field 5 value changed:", e.target.value),
  ];
  const selectOptions = [area,[], crews,[], shifts];

  return (
    <Dashboard
      numFields={numFields}
      fieldTypes={fieldTypes}
      fieldLabels={fieldLabels}
      fieldValues={fieldValues}
      onChangeHandlers={onChangeHandlers}
      selectOptions={selectOptions}
    />
  );
};

export default HeatPage;
