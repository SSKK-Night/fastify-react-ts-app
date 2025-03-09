// src/views/Admin/AdminForm.tsx
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import DynamicForm from "../../components/shared/dynamicForm";

const AdminForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const handleSubmit = async (formData: Record<string, string>) => {
    if (isEditMode) {
      await apiClient.put(`/admins/${id}`, formData);
    } else {
      await apiClient.post("/admins", formData);
    }
    navigate("/admins");
  };

  return (
    <div>
      <h1>{isEditMode ? "Edit Admin" : "Create Admin"}</h1>
      <DynamicForm
        fields={[
          { name: "name", label: "Admin Name", type: "input" },
          { name: "email", label: "Email", type: "input" },
          { name: "role", label: "Role", type: "input" },
          { name: "description", label: "Description", type: "textarea" }, // Textareaも指定可能
        ]}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminForm;
