import { useState } from "react";
import { Menu, User } from "lucide-react";

export default function Topbar({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 shadow z-50">
      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 hover:text-gray-900"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2"
        >
          <User className="w-6 h-6 text-gray-700" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Edit Profile
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
