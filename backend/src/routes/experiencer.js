// routes/experiencer.js
const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experiencec');

// Public route: Anyone visiting your portfolio can fetch the experiences
router.get('/', experienceController.getAllExperiences);

// Protected Dashboard routes: Handled by CRUD
// Note: If you have an authentication middleware (e.g., protect/verifyToken), place it before the controller function
router.post('/', experienceController.createExperience);
router.put('/:id', experienceController.updateExperience);
router.delete('/:id', experienceController.deleteExperience);

module.exports = router;