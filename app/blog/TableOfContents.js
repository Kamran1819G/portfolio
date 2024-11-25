import React from "react";
import { BookOpen } from "lucide-react";

const TableOfContents = ({ content }) => {
  const headers = content.match(/#{2,3}\s+([^\n]+)/g) || [];
  if (headers.length === 0) return null;

  return (
    <div className="hidden lg:block sticky top-8 ml-8 p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4" />
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {headers.map((header, index) => {
          const level = header.match(/#{2,3}/)[0].length;
          const title = header.replace(/#{2,3}\s+/, "");
          const slug = title
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+$/, "");

          return (
            <a
              key={index}
              href={`#${slug}`}
              className={`block text-gray-600 hover:text-gray-900 transition-colors ${
                level === 3 ? "ml-4 text-sm" : "font-medium"
              }`}
            >
              {title}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;
