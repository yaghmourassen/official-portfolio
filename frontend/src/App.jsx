import React, { useState, useEffect } from 'react';
import Home from './pages/home'; 
import Login from './pages/login';
import Admin from './pages/admin';
import './App.css'; 

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
      {/* 1. العرض الافتراضي لجميع الزوار (الموقع العام) */}
      {view === 'portfolio' && <Home />}
      
      {/* 2. منطقة الإدارة: محمية ومخفية خلف الرابط السري */}
      {view === 'admin' && (
        isAuthenticated ? <Admin /> : <Login onLogin={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;