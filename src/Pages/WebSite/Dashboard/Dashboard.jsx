import React from "react";
import { TextField, Select, MenuItem } from "@mui/material";

// Function to generate dynamic UI elements
const Dashboard = ({ numFields, fieldTypes, fieldLabels, fieldValues, onChangeHandlers, selectOptions }) => {
  const renderField = (type, label, value, onChange, options, key) => {
    switch (type) {
      case "TextBox":
        return (
          <TextField
            fullWidth
            size="small"
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            key={key}
          />
        );
      case "SelectBox":
        return (
          <Select
            fullWidth
            size="small"
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            key={key}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  const fields = [];
  for (let i = 0; i < numFields; i++) {
    fields.push(renderField(fieldTypes[i], fieldLabels[i], fieldValues[i], onChangeHandlers[i], selectOptions[i], i));
  }

  return <div>{fields}</div>;
};
export default Dashboard;
