const educationService = require('../services/educations');

const getAllEducation = async (req, res) => {
    try {
        const educations = await educationService.getAllEducation();
        res.status(200).json(educations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEducation = async (req, res) => {
    try {
        // تم تحديث هذا السطر ليشمل certificateUrl
        const { years, degree, fieldOfStudy, school, certificateUrl } = req.body;
        
        // تمرير الحقل الجديد للـ service
        const newEducation = await educationService.createEducation({ 
            years, degree, fieldOfStudy, school, certificateUrl 
        });
        
        res.status(201).json(newEducation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        // هنا req.body سيقوم بتمرير certificateUrl إذا كان موجوداً في التحديث
        const updated = await educationService.updateEducation(id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Education record not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEducation = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await educationService.deleteEducation(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Education record not found' });
        }
        res.status(200).json({ message: 'Education record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllEducation,
    createEducation,
    updateEducation,
    deleteEducation
};