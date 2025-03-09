import React from "react";

type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ エラーメッセージ表示 */}
    </div>
  );
};

export default SelectField;
