import { Routes, Route } from "react-router-dom";
import AdminList from "../views/Admin/adminList";
import AdminForm from "../views/Admin/adminForm";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminList />} />
      <Route path="/create" element={<AdminForm />} />
      <Route path="/edit/:id" element={<AdminForm />} />
    </Routes>
  );
};

export default AdminRoutes;
