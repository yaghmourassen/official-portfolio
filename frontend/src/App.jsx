import React, { useState, useEffect, lazy, Suspense } from 'react';
import SEO from './components/SEO';
import Home from './pages/Home'; 
import Login from './pages/login';
import './App.css'; 

// التحميل الكسول لصفحة لوحة التحكم (Admin)
const Admin = lazy(() => import('./pages/admin'));

function App() {
  const [view, setView] = useState('portfolio'); 
  
  // 1. قراءة حالة تسجيل الدخول من localStorage فور تحميل التطبيق
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    // التحقق من الرابط السري في عنوان المتصفح لقفل أو فتح لوحة التحكم
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'didou-admin') {
      setView('admin');
    }
  }, []);

  // 2. دالة تُستدعى عند نجاح تسجيل الدخول لتخزين الجلسة
  const handleLoginSuccess = (status) => {
    if (status) {
      localStorage.setItem('isLoggedIn', 'true');
    }
    setIsAuthenticated(status);
  };

  // 3. دالة تسجيل الخروج وتنظيف الجلسة
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {/* تطبيق وسوم الـ SEO */}
      <SEO title="Home" />

      {/* 1. العرض الافتراضي لجميع الزوار (الموقع العام) */}
      {view === 'portfolio' && <Home />}
      
      {/* 2. منطقة الإدارة: محمية ومخفية خلف الرابط السري ومحفوظة بالجلسة */}
      {view === 'admin' && (
        isAuthenticated ? (
          <Suspense fallback={<div className="text-center py-5">Loading Admin...</div>}>
            <Admin onLogout={handleLogout} />
          </Suspense>
        ) : (
          <Login onLogin={handleLoginSuccess} />
        )
      )}
    </div>
  );
}

export default App;