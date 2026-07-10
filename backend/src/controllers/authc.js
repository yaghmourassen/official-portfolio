// دالة التحقق من تسجيل الدخول للمسؤول (Admin)
const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  // الحساب الخاص بك كمسؤول للوحة التحكم
  if (username === 'admin' && password === '123456') {
    res.status(200).json({ 
      success: true, 
      message: 'Welcome back, Didou! Authentication successful.' 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid username or password!' 
    });
  }
};

module.exports = {
  loginAdmin
};