import React from "react";

type FieldType = "input" | "textarea";

type FormFieldProps = {
  label: string;
  name: string;
  type: FieldType;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormField: React.FC<FormFieldProps> = ({ label, name, type, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {type === "textarea" ? (
        <textarea name={name} id={name} {...rest} />
      ) : (
        <input type="text" name={name} id={name} {...rest} />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ エラーメッセージ表示 */}
    </div>
  );
};

export default FormField;
