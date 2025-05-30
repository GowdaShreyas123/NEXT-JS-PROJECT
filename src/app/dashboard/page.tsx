"use client";
import React, { useState } from "react";
import { 
  Pencil, 
  Plus, 
  Trash, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  RefreshCw, 
  Sun, 
  Moon, 
  Users, 
  Filter,
  Eye,
  Star,
  Sparkles
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

const initialUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", address: "123 Main St" },
  { id: 2, name: "Bob", email: "bob@example.com", address: "456 Maple Ave" },
  { id: 3, name: "Charlie", email: "charlie@example.com", address: "789 Oak Blvd" },
  { id: 4, name: "Dave", email: "dave@example.com", address: "321 Birch St" },
  { id: 5, name: "Eve", email: "eve@example.com", address: "654 Pine Rd" },
  { id: 6, name: "Frank", email: "frank@example.com", address: "101 Cedar Ln" },
  { id: 7, name: "Grace", email: "grace@example.com", address: "202 Elm St" },
  { id: 8, name: "Hank", email: "hank@example.com", address: "303 Walnut Ave" },
  { id: 9, name: "Ivy", email: "ivy@example.com", address: "404 Spruce Dr" },
  { id: 10, name: "Jack", email: "jack@example.com", address: "505 Hickory St" },
  { id: 11, name: "Kate", email: "kate@example.com", address: "606 Redwood Blvd" },
  { id: 12, name: "Leo", email: "leo@example.com", address: "707 Fir Ct" },
  { id: 13, name: "Mia", email: "mia@example.com", address: "808 Poplar Way" },
  { id: 14, name: "Nina", email: "nina@example.com", address: "909 Sycamore Cir" },
  { id: 15, name: "Oscar", email: "oscar@example.com", address: "1001 Magnolia Rd" },
];

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const usersPerPage = 8;
  
  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setUsers((prev) => prev.filter((user) => !selectedIds.includes(user.id)));
    setSelectedIds([]);
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleModalSubmit = () => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...editingUser, ...formData } : u))
      );
    } else {
      const newUser: User = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name: formData.name,
        email: formData.email,
        address: formData.address,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setShowModal(false);
    setFormData({ name: "", email: "", address: "" });
    setEditingUser(null);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, 5);
      else if (currentPage >= totalPages - 2)
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      else for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }
    return pages.map((page) => (
      <button
        key={page}
        className={`relative w-10 h-10 flex items-center justify-center text-sm font-medium rounded-xl transition-all duration-300 ${
          currentPage === page
            ? isDarkMode 
              ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25" 
              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
            : isDarkMode
              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
        {currentPage === page && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 animate-pulse" />
        )}
      </button>
    ));
  };

  const avatarColors = [
    "from-pink-400 to-red-400",
    "from-blue-400 to-indigo-500",
    "from-green-400 to-emerald-500",
    "from-yellow-400 to-orange-500",
    "from-purple-400 to-violet-500",
    "from-indigo-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-orange-400 to-red-500",
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900" 
        : "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50"
    }`}>
      <div className="relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 animate-pulse ${
            isDarkMode ? "bg-violet-500" : "bg-blue-300"
          }`} style={{ animationDelay: "0s", animationDuration: "4s" }} />
          <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse ${
            isDarkMode ? "bg-purple-500" : "bg-indigo-300"
          }`} style={{ animationDelay: "2s", animationDuration: "6s" }} />
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border transition-all duration-500 ${
            isDarkMode 
              ? "bg-gray-800/80 border-gray-700/50 shadow-purple-900/20" 
              : "bg-white/80 border-white/50 shadow-blue-900/10"
          }`}>
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-violet-500 to-purple-600" 
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
                } shadow-lg`}>
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    User Management
                  </h1>
                  <div className="flex items-center gap-2">
                    <Sparkles className={`${isDarkMode ? "text-violet-400" : "text-blue-500"}`} size={16} />
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {filteredUsers.length} users found
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Dark mode toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative p-3 rounded-2xl transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div className="relative w-6 h-6">
                    <Sun className={`absolute inset-0 transition-all duration-500 ${
                      isDarkMode 
                        ? "opacity-0 rotate-90 scale-50" 
                        : "opacity-100 rotate-0 scale-100"
                    } ${isDarkMode ? "text-gray-400" : "text-yellow-500"}`} size={24} />
                    <Moon className={`absolute inset-0 transition-all duration-500 ${
                      isDarkMode 
                        ? "opacity-100 rotate-0 scale-100" 
                        : "opacity-0 -rotate-90 scale-50"
                    } ${isDarkMode ? "text-violet-400" : "text-gray-400"}`} size={24} />
                  </div>
                </button>
                
                <button className={`p-3 rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}>
                  <RefreshCw size={20} />
                </button>
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-violet-500 to-purple-600" 
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
                } shadow-lg`}>
                  <Star className="text-white" size={20} />
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`} size={20} />
              <input
                type="text"
                placeholder="Search users by name, email, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-6 py-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode 
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-violet-500 focus:border-violet-500" 
                    : "bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                } backdrop-blur-sm`}
              />
            </div>

            {/* Filter tabs */}
            <div className="flex gap-8 mb-8">
              <button className={`pb-3 font-semibold transition-all duration-300 border-b-2 ${
                isDarkMode 
                  ? "text-violet-400 border-violet-400" 
                  : "text-blue-500 border-blue-500"
              }`}>
                All users
              </button>
              <button className={`pb-3 transition-all duration-300 ${
                isDarkMode 
                  ? "text-gray-400 hover:text-gray-200" 
                  : "text-gray-500 hover:text-gray-700"
              }`}>
                Active
              </button>
              <button className={`pb-3 transition-all duration-300 ${
                isDarkMode 
                  ? "text-gray-400 hover:text-gray-200" 
                  : "text-gray-500 hover:text-gray-700"
              }`}>
                Inactive
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700" 
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                }`}
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ name: "", email: "", address: "" });
                  setShowModal(true);
                }}
              >
                <Plus size={18} />
                Add User
              </button>
              <button
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  selectedIds.length === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : isDarkMode
                      ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700"
                      : "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700"
                }`}
                onClick={deleteSelected}
                disabled={selectedIds.length === 0}
              >
                <Trash size={18} />
                Delete Selected ({selectedIds.length})
              </button>
            </div>
          </div>

          {/* Table */}
          <div className={`backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border transition-all duration-500 ${
            isDarkMode 
              ? "bg-gray-800/80 border-gray-700/50" 
              : "bg-white/80 border-white/50"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-50/80"
                } backdrop-blur-sm`}>
                  <tr>
                    <th className={`text-left py-6 px-8 font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      ID
                    </th>
                    <th className={`text-left py-6 px-8 font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      User
                    </th>
                    <th className={`text-left py-6 px-8 font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      Contact
                    </th>
                    <th className={`text-left py-6 px-8 font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`border-b transition-all duration-300 hover:shadow-lg group ${
                        isDarkMode 
                          ? "border-gray-700/50 hover:bg-gray-700/30" 
                          : "border-gray-100 hover:bg-blue-50/50"
                      } ${selectedIds.includes(user.id) 
                        ? isDarkMode 
                          ? 'bg-violet-500/10 border-violet-500/20' 
                          : 'bg-blue-50 border-blue-200'
                        : ''
                      }`}
                    >
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(user.id)}
                            onChange={() => toggleSelect(user.id)}
                            className={`w-5 h-5 rounded-lg border-2 transition-all duration-300 ${
                              isDarkMode 
                                ? "border-gray-600 text-violet-500 focus:ring-violet-500" 
                                : "border-gray-300 text-blue-500 focus:ring-blue-500"
                            }`}
                          />
                          <span className={`font-mono font-semibold px-3 py-1 rounded-lg ${
                            isDarkMode 
                              ? "bg-gray-700 text-gray-300" 
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            #{user.id.toString().padStart(3, '0')}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${
                            avatarColors[user.id % avatarColors.length]
                          } rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className={`font-semibold text-lg ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="space-y-1">
                          <div className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {user.email}
                          </div>
                          <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {user.address}
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-3">
                          <button
                            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                              isDarkMode 
                                ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" 
                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            }`}
                            onClick={() => {
                              setEditingUser(user);
                              setFormData({
                                name: user.name,
                                email: user.email,
                                address: user.address,
                              });
                              setShowModal(true);
                            }}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                              isDarkMode 
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={`flex justify-between items-center px-8 py-6 border-t ${
              isDarkMode 
                ? "border-gray-700/50 bg-gray-700/30" 
                : "border-gray-100 bg-gray-50/50"
            } backdrop-blur-sm`}>
              <div className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length}
              </div>
              <div className="flex items-center gap-3">
                <button
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    currentPage === 1
                      ? isDarkMode 
                        ? "text-gray-600 cursor-not-allowed" 
                        : "text-gray-300 cursor-not-allowed"
                      : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {renderPaginationNumbers()}
                </div>
                <button
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    currentPage === totalPages
                      ? isDarkMode 
                        ? "text-gray-600 cursor-not-allowed" 
                        : "text-gray-300 cursor-not-allowed"
                      : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-3xl shadow-2xl transition-all duration-500 transform ${
            isDarkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          }`}>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-2xl ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-violet-500 to-purple-600" 
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
                } shadow-lg`}>
                  {editingUser ? <Pencil className="text-white" size={20} /> : <Plus className="text-white" size={20} />}
                </div>
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {editingUser ? "Edit User" : "Add New User"}
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-violet-500 focus:border-violet-500" 
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-violet-500 focus:border-violet-500" 
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-violet-500 focus:border-violet-500" 
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Enter full address"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <button
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    isDarkMode 
                      ? "text-gray-300 border border-gray-600 hover:bg-gray-700" 
                      : "text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setFormData({ name: "", email: "", address: "" });
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    isDarkMode 
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700" 
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                  }`}
                  onClick={handleModalSubmit}
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}