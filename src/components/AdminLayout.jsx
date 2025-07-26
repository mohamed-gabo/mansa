import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'لوحة التحكم', path: '/admin/dashboard' },
    { name: 'المقررات', path: '/admin/courses' },
    { name: 'البيانات الأساسية', path: '/admin/basic-data' },
    { name: 'المحتوى', path: '/admin/content' },
    { name: 'المكتبة الإلكترونية', path: '/admin/e-library' },
    { name: 'المدفوعات', path: '/admin/payments' },
    { name: 'خدمات السنتر', path: '/admin/center-services' },
    { name: 'التقييمات', path: '/admin/reviews' },
    { name: 'المستخدمين', path: '/admin/users' },
    { name: 'الاختبارات', path: '/admin/quizzes' },
    { name: 'المراسلة', path: '/admin/messaging' },
    { name: 'الإعدادات', path: '/admin/admin-settings' },
    { name: 'التقارير', path: '/admin/reports' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 arabic-text" dir="rtl">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors ${
                location.pathname === item.path ? 'bg-green-100 text-green-600 border-r-4 border-green-600' : ''
              }`}
            >
              {isSidebarOpen && item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-gray-800">المنصة التعليمية</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

