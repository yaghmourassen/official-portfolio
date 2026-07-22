import API_URL from "./api";

// التأكد من أن مسار المهارات موجه بالشكل الصحيح
const SKILLS_API = `${API_URL}/skills`;

// جلب جميع المهارات
export const getSkills = async () => {
    try {
        const response = await fetch(SKILLS_API);
        return await response.json();
    } catch (error) {
        console.error("Fetch skills error:", error);
        return [];
    }
};

// إضافة مهارة جديدة
export const addSkill = async (skillData) => {
    try {
        const response = await fetch(SKILLS_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(skillData),
        });
        return await response.json();
    } catch (error) {
        console.error("Add skill error:", error);
        return { message: "Failed to connect to server." };
    }
};

// حذف مهارة
export const deleteSkill = async (id) => {
    try {
        const response = await fetch(`${SKILLS_API}/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    } catch (error) {
        console.error("Delete skill error:", error);
        return { message: "Failed to connect to server." };
    }
};