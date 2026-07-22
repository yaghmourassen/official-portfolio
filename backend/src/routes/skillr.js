const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillc');

// مسار لجلب جميع المهارات
router.get('/', skillController.getSkills);

// مسار لإضافة مهارة جديدة
router.post('/', skillController.addSkill);

// مسار لحذف مهارة بناءً على الـ ID
router.delete('/:id', skillController.removeSkill);

module.exports = router;