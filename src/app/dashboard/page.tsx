"use client";

import React, { useState } from "react";
import { Pencil, Plus, Trash, ChevronLeft, ChevronRight, MoreHorizontal, Search, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

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
        className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md ${
          currentPage === page
            ? "bg-blue-500 text-white"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">User</h1>
              <p className="text-gray-500 text-sm">{users.length} users found</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <RefreshCw size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Search size={20} />
              </button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-6 mb-6">
            <button className="text-blue-500 border-b-2 border-blue-500 pb-2 font-medium">All users</button>
            <button className="text-gray-500 pb-2 hover:text-gray-700">Edit</button>
            <button className="text-gray-500 pb-2 hover:text-gray-700">Delete</button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mb-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
              onClick={() => {
                setEditingUser(null);
                setFormData({ name: "", email: "", address: "" });
                setShowModal(true);
              }}
            >
              <Plus size={16} /> Add User
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium ${
                selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={deleteSelected}
              disabled={selectedIds.length === 0}
            >
              <Trash size={16} /> Delete Selected
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-black-500 w-12">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-black-500">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-black-500">Address</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-black-500">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-black-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className={`border-b border-gray-100 hover:bg-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-200 ${selectedIds.includes(user.id) ? 'bg-blue-50' : ''}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(user.id)}
                          onChange={() => toggleSelect(user.id)}
                          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-900 font-medium">#{user.id.toString().padStart(3, '0')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-gray-900 font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{user.address}</td>
                    <td className="py-4 px-6 text-gray-600">{user.email}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200"
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
                          <Pencil size={16} className="mr-1" />
                        </button>
                        <button
                           className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full hover:bg-red-200"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash size={16} className="mr-1" />
                        </button>
                      </div>
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1">
                {renderPaginationNumbers()}
              </div>
              <button
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter address"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setFormData({ name: "", email: "", address: "" });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={handleModalSubmit}
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}