// src/views/Shared/FormField.tsx
import React from "react";

type FieldType = "input" | "textarea";

type FormFieldProps = {
  label: string;
  name: string;
  type: FieldType; // `input` か `textarea` を指定
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const FormField: React.FC<FormFieldProps> = ({ label, name, type, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea name={name} value={value} onChange={onChange} />
      ) : (
        <input type="text" name={name} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default FormField;
