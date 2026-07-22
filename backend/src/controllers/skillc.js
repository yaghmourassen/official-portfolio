const skillService = require('../services/skills');

class SkillController {
    // جلب كل المهارات
    async getSkills(req, res) {
        try {
            const skills = await skillService.getAllSkills();
            return res.status(200).json({
                success: true,
                data: skills
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // إضافة مهارة جديدة
    async addSkill(req, res) {
        try {
            const newSkill = await skillService.createSkill(req.body);
            return res.status(201).json({
                success: true,
                message: "Skill created successfully",
                data: newSkill
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // حذف مهارة
    async removeSkill(req, res) {
        try {
            const result = await skillService.deleteSkill(req.params.id);
            return res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new SkillController();