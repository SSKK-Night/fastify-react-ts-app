import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormField from "./formField";
import SelectField from "./selectField";

type FieldConfig = {
  name: string;
  label: string;
  type: "input" | "textarea" | "select"; // ✅ `select` を追加
  options?: { value: string; label: string }[]; // ✅ `select` の選択肢用
  validation?: z.ZodTypeAny; // ✅ バリデーションを追加
};

type DynamicFormProps = {
  fields: FieldConfig[]; // 入力フィールドの設定
  onSubmit: (formData: Record<string, any>) => void; // 送信時の処理
  initialState?: Record<string, any>; // 初期値
};

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, initialState = {} }) => {
  // ✅ `Zod` を使ってスキーマを作成
  const schema = z.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {} as Record<string, z.ZodTypeAny>)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => {
        const errorMessage = errors[field.name]?.message ? String(errors[field.name]?.message) : undefined;

        if (field.type === "select") {
          return (
            <SelectField
              key={field.name}
              label={field.label}
              options={field.options || []}
              error={errorMessage}
              {...register(field.name)} // ✅ nameを明示的に渡さない
            />
          );
        }
        return (
          <FormField
            key={field.name}
            label={field.label}
            type={field.type}
            error={errorMessage}
            {...register(field.name)} // ✅ nameを明示的に渡さない
          />
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
