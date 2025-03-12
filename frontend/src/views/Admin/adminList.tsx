import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminListViewModel } from "../../viewModels/admin/adminListViewModel";

const AdminList: React.FC = () => {
  const { admins, loading, error, deleteAdmin } = useAdminListViewModel();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Admin List</h1>
      <button onClick={() => navigate("/admins/create")}>Create Admin</button>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>{admin.isActive ? "✅" : "❌"}</td>
              <td>{admin.last_login_at ? new Date(admin.last_login_at).toLocaleString() : "N/A"}</td>
              <td>
                <button onClick={() => navigate(`/admins/edit/${admin.id}`)}>Edit</button>
                <button onClick={() => deleteAdmin(admin.id)} style={{ color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
