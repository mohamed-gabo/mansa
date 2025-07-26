import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import AdminCourses from './components/AdminCourses';
import AdminBasicData from './components/AdminBasicData';
import AdminContent from './components/AdminContent';
import AdminELibrary from './components/AdminELibrary';
import AdminPayments from './components/AdminPayments';
import AdminCenterServices from './components/AdminCenterServices';
import AdminReviews from './components/AdminReviews';
import AdminUsers from './components/AdminUsers';
import AdminQuizzes from './components/AdminQuizzes';
import AdminMessaging from './components/AdminMessaging';
import AdminSettings from './components/AdminSettings';
import AdminReports from './components/AdminReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <Header />
            <main>
              <Hero />
              <Features />
              <Courses />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="" element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="basic-data" element={<AdminBasicData />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="e-library" element={<AdminELibrary />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="center-services" element={<AdminCenterServices />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="quizzes" element={<AdminQuizzes />} />
              <Route path="messaging" element={<AdminMessaging />} />
              <Route path="admin-settings" element={<AdminSettings />} />
              <Route path="reports" element={<AdminReports />} />
            </Routes>
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;


