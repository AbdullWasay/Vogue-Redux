import React from 'react';
import AdminProducts from '../Admin/AdminProducts.jsx';

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h1>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Manage Products
        </h2>
        <AdminProducts />
      </div>
    </div>
  );
};

export default AdminDashboard;
