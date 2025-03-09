// src/views/Shared/SelectField.tsx
import React from "react";

type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
