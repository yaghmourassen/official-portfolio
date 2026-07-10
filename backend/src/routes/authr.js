const express = require('express');
const router = express.Router();
// استدعاء الدالة التي أنشأناها في الخطوة السابقة
const { loginAdmin } = require('../controllers/authc');

// تحديد مسار تسجيل الدخول
router.post('/login', loginAdmin);

module.exports = router;