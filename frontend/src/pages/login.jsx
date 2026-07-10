import React, { useState } from 'react';
// استدعاء دالة الاتصال بالسيرفر من المجلد الصحيح حسب الهيكل
import { loginRequest } from '../services/auth'; //  هذا هو الملف الصحيح المخصص للـ Login

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // إعادة تهيئة الأخطاء عند كل محاولة

    try {
      const data = await loginRequest(username, password);
      
      if (data.success) {
        onLogin(true); // إذا نجحت العملية، نقوم بتغيير الحالة لفتح الـ Dashboard
      } else {
        setError(data.message || 'بيانات الدخول غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالسيرفر. تأكد من تشغيل الـ Backend.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;