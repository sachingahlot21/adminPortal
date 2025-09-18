import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  BarChart2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Sidebar({ isOpen }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-0"
      } bg-gray-900 text-white h-screen transition-all duration-300 overflow-hidden`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              to="/"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <LayoutDashboard className="mr-2 w-5 h-5" /> Dashboard
            </Link>
          </li>

          {/* Products */}
          <li>
            <button
              onClick={() => toggleMenu("products")}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded"
            >
              <span className="flex items-center">
                <Package className="mr-2 w-5 h-5" /> Products
              </span>
              {openMenu === "products" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {openMenu === "products" && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/admin/products/view"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    View Products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/products/add"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Add Product
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Categories */}
          <li>
            <button
              onClick={() => toggleMenu("categories")}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded"
            >
              <span className="flex items-center">
                <Tags className="mr-2 w-5 h-5" /> Categories
              </span>
              {openMenu === "categories" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {openMenu === "categories" && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/admin/categories/add"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Add Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categories/view"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    View Categories
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Sales */}
          <li>
            <Link
              to="/admin/sales"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <BarChart2 className="mr-2 w-5 h-5" /> Sales
            </Link>
          </li>

          {/* Customers */}
          <li>
            <Link
              to="/admin/customers"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <Users className="mr-2 w-5 h-5" /> Customers
            </Link>
          </li>

          {/* Orders */}
          <li>
            <Link
              to="/admin/orders"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <ShoppingCart className="mr-2 w-5 h-5" /> Orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
