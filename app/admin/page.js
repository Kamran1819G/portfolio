"use client";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import ManageProjects from "./components/ManageProjects";
import ManageBlogs from "./components/ManageBlogs";
import ManageCertifications from "./components/ManageCertifications";
import ManageEducations from "./components/ManageEducations";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  useEffect(() => {
    if (!user && !loading) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={handleMenuSelect} selectedMenu={selectedMenu} />
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {(() => {
          switch (selectedMenu) {
            case "Dashboard":
              return <Dashboard />;
            case "Projects":
              return <ManageProjects />;
            case "Blogs":
              return <ManageBlogs />;
            case "Certifications":
              return <ManageCertifications />;
            case "Educations":
              return <ManageEducations />;
            default:
              return <Dashboard />;
          }
        })()}
      </main>
    </div>
  );
};

export default AdminDashboard;
