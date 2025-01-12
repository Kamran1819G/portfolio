"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <p className="text-gray-600">
        Welcome to your admin dashboard. Here, you can manage your personal
        portfolio.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Projects Overview</h2>
          <p className="text-gray-600">
            Manage your awesome projects, update live links, and showcase your
            skills.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
          <p className="text-gray-600">
            Create and edit engaging blog content, and share your thoughts.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Certifications</h2>
          <p className="text-gray-600">
            Display your professional credentials and achievements.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <p className="text-gray-600">
            Showcase your academic background, institutions attended, and
            courses studied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
