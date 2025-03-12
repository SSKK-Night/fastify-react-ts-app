import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./adminRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admins/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
