// src/views/Shared/DynamicForm.tsx
import React, { useState } from "react";
import FormField from "./formField";
import SelectField from "./selectField"; // ✅ 新しく作成する `SelectField.tsx`

type FieldConfig = {
  name: string;
  label: string;
  type: "input" | "textarea" | "select"; // ✅ `select` を追加
  options?: { value: string; label: string }[]; // ✅ `select` の選択肢用
};

type DynamicFormProps = {
  fields: FieldConfig[]; // 入力フィールドの設定
  onSubmit: (formData: Record<string, string>) => void; // 送信時の処理
  initialState?: Record<string, string>; // 初期値
};

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, initialState = {} }) => {
  const [formData, setFormData] = useState<Record<string, string>>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <SelectField
              key={field.name}
              name={field.name}
              label={field.label}
              options={field.options || []}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          );
        }
        return (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
