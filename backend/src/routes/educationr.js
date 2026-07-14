const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationc');

// Public route to fetch all education records
router.get('/', educationController.getAllEducation);

// Protected/Admin routes (you can wrap these with your existing auth middleware later)
router.post('/', educationController.createEducation);
router.put('/:id', educationController.updateEducation);
router.delete('/:id', educationController.deleteEducation);

module.exports = router;