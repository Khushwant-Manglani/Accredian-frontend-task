import React from "react";
import Select from "react-select";

const colourStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1A73E8",
    borderRadius: "5px", // Add border radius
    boxShadow: "none",
    padding: "6px 12px",
    "&": {
      border: "none",
      cursor: "pointer",
    },
    "& svg": {
      color: "#fff",
      position: "absolute",
      bottom: "11px",
      right: "6px",
    },
    "& svg:hover": {
      border: "2px solid #1A73E8",
    },
    "& span": {
      display: "none",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff", // Increase darkness of white text for placeholder
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff", // Ensure selected value text color is white
  }),
  option: (provided, state) => ({
    ...provided,
    border: "none",
    borderBottom: "1px solid #ffffff",
    backgroundColor: state.isSelected ? "#1A73E8" : "#1A73E8", // Change background color on click
    color: "#ffffff",
    "&:hover": {
      color: "#1A73E8",
      backgroundColor: "#fff", // Darker gray on hover
      cursor: "pointer",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "5px", // Add border radius to the menu
    backgroundColor: "#fff",
    marginTop: "10px",
  }),
};

const Dropdown = ({ label, labelFor, options, placeholder }) => {
  return (
    <div className="text-[#ffffff] w-full">
      <label htmlFor={labelFor} className="text-sm">
        {label}
      </label>
      <div className="w-full flex flex-col items-center text-base font-['Inter'] border rounded-[5px]">
        <Select
          options={options}
          className="w-full h-8 bg-[#1A73E8]"
          placeholder={placeholder}
          styles={colourStyles}
        />
      </div>
    </div>
  );
};

export default Dropdown;
