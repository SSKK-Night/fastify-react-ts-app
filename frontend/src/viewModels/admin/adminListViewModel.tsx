import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { Admin } from "../../models/admin";

export const useAdminListViewModel = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 管理者一覧を取得
  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<Admin[]>("/admins");
      setAdmins(data);
    } catch (err) {
      setError("Failed to fetch admins");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 管理者を削除
  const deleteAdmin = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await apiClient.delete(`/admins/${id}`);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete admin", err);
      setError("Failed to delete admin");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return {
    admins,
    loading,
    error,
    fetchAdmins,
    deleteAdmin,
  };
};
