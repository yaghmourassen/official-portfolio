const Skill = require('../models/skillm');

class SkillService {
    // جلب جميع المهارات
    async getAllSkills() {
        try {
            return await Skill.findAll();
        } catch (error) {
            throw new Error(`Error fetching skills: ${error.message}`);
        }
    }

    // إضافة مهارة جديدة
    async createSkill(skillData) {
        try {
            return await Skill.create(skillData);
        } catch (error) {
            throw new Error(`Error creating skill: ${error.message}`);
        }
    }

    // حذف مهارة
    async deleteSkill(id) {
        try {
            const skill = await Skill.findByPk(id);
            if (!skill) {
                throw new Error('Skill not found');
            }
            await skill.destroy();
            return { message: 'Skill deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting skill: ${error.message}`);
        }
    }
}

module.exports = new SkillService();