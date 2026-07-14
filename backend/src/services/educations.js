const Education = require('../models/educationm');

class EducationService {
    async getAllEducation() {
        return await Education.findAll({
            order: [['createdAt', 'DESC']] // Shows newest first
        });
    }

    async getEducationById(id) {
        return await Education.findByPk(id);
    }

    async createEducation(data) {
        return await Education.create(data);
    }

    async updateEducation(id, data) {
        const education = await Education.findByPk(id);
        if (!education) return null;
        return await education.update(data);
    }

    async deleteEducation(id) {
        const education = await Education.findByPk(id);
        if (!education) return false;
        await education.destroy();
        return true;
    }
}

module.exports = new EducationService();