import React, { useState, useEffect, lazy, Suspense } from 'react';
import SEO from './components/SEO'; // استدعاء مكون الـ SEO الذي أنشأناه
import Home from './pages/home'; 
import Login from './pages/login';
import './App.css'; 

// التحميل الكسول لصفحة لوحة التحكم (Admin) لتكون مخفية وثقيلة التحميل فقط عند الحاجة
const Admin = lazy(() => import('./pages/admin'));

function App() {
  const [view, setView] = useState('portfolio'); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // التحقق من الرابط السري في عنوان المتصفح لقفل أو فتح لوحة التحكم
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'didou-admin') {
      setView('admin');
    }
  }, []);

  // دالة تُستدعى عند نجاح تسجيل الدخول من صفحة Login
  const handleLoginSuccess = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div className="App">
      {/* تطبيق وسوم الـ SEO لتظهر في محركات البحث لجعل موقعك احترافياً */}
      <SEO title="Home" />

      {/* 1. العرض الافتراضي لجميع الزوار (الموقع العام) */}
      {view === 'portfolio' && <Home />}
      
      {/* 2. منطقة الإدارة: محمية ومخفية خلف الرابط السري */}
      {view === 'admin' && (
        isAuthenticated ? (
          <Suspense fallback={<div className="text-center py-5">Loading Admin...</div>}>
            <Admin />
          </Suspense>
        ) : (
          <Login onLogin={handleLoginSuccess} />
        )
      )}
    </div>
  );
}

export default App;