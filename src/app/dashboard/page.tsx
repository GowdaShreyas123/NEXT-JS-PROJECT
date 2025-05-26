"use client";

import React, { useState } from "react";
import { Pencil, Plus, Trash, ChevronLeft, ChevronRight } from "lucide-react";
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
        className={`w-8 h-8 flex items-center justify-center text-sm font-medium border ${
          currentPage === page
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
        } rounded`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => {
                setEditingUser(null);
                setFormData({ name: "", email: "", address: "" });
                setShowModal(true);
              }}
            >
              <Plus size={16} /> Add
            </button>
            <button
              className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              onClick={deleteSelected}
              disabled={selectedIds.length === 0}
            >
              <Trash size={16} /> Delete
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full table-auto text-sm text-left text-gray-300">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3">Select</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-600 hover:bg-gray-700">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                    />
                  </td>
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      className="text-blue-400 hover:text-blue-200"
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
                      className="text-red-400 hover:text-red-200"
                      onClick={() => deleteUser(user.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
            <span className="font-medium">{Math.min(indexOfLastUser, users.length)}</span> of{" "}
            <span className="font-medium">{users.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              className={`w-8 h-8 flex items-center justify-center border ${
                currentPage === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              } rounded`}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} />
            </button>
            {renderPaginationNumbers()}
            <button
              className={`w-8 h-8 flex items-center justify-center border ${
                currentPage === totalPages
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              } rounded`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={14} />
            </button>
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
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">
                {editingUser ? "Edit User" : "Add User"}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setFormData({ name: "", email: "", address: "" });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleModalSubmit}
                >
                  {editingUser ? "Update" : "Add"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
