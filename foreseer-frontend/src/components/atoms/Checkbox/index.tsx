import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className="checkboxContainer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="checkbox"
      />
      <span className="checkmark"></span>{" "}
      {label && <span className="checkboxLabel">{label}</span>}
    </label>
  );
};

export default Checkbox;
