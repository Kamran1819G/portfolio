"use client";
import {
  LayoutDashboard,
  Book,
  GraduationCap,
  BadgeCheck,
  Code,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = ({ onSelect, selectedMenu }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const handleHover = () => {
    setIsSidebarOpen(true);
  };

  const handleLeave = () => {
    setIsSidebarOpen(false);
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Projects",
      icon: <Code className="h-4 w-4" />,
    },
    {
      name: "Blogs",
      icon: <Book className="h-4 w-4" />,
    },
    {
      name: "Certifications",
      icon: <BadgeCheck className="h-4 w-4" />,
    },
    {
      name: "Educations",
      icon: <GraduationCap className="h-4 w-4" />,
    },
  ];

  const sidebarVariants = {
    open: { width: 256 }, // Adjust width if needed
    closed: { width: 64 },
  };

  return (
    <motion.aside
      className="bg-gray-800 text-white h-full overflow-hidden"
      variants={sidebarVariants}
      animate={isSidebarOpen ? "open" : "closed"}
      transition={{ duration: 0.3, type: "tween" }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <nav className="mt-4">
        {menuItems.map((item) => (
          <motion.div
            key={item.name}
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 ${
              selectedMenu === item.name ? "bg-gray-700" : ""
            }`}
            onClick={() => onSelect(item.name)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="mr-2">{item.icon}</span>
            <motion.span
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.name}
            </motion.span>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className="mt-auto p-4 flex items-center cursor-pointer hover:bg-gray-700"
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <LogOut className="h-4 w-4 mr-2" />
        <motion.span
          animate={{ opacity: isSidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Logout
        </motion.span>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
