import API_URL from "./api";

const PROJECTS_API = `${API_URL}/projects`;

// 1. جلب جميع المشاريع
export const getAllProjectsRequest = async () => {
    try {
        const response = await fetch(PROJECTS_API);
        return await response.json();
    } catch (error) {
        console.error("Fetch projects error:", error);
        return [];
    }
};

// 2. إرسال مشروع جديد
export const createProjectRequest = async (projectData) => {
    try {
        const response = await fetch(PROJECTS_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        });
        return await response.json();
    } catch (error) {
        console.error("Create project error:", error);
        return { message: "Failed to connect to server." };
    }
};

// 3. تحديث مشروع موجود (الدالة التي كانت تنقصك)
export const updateProjectRequest = async (id, projectData) => {
    try {
        const response = await fetch(`${PROJECTS_API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        });
        return await response.json();
    } catch (error) {
        console.error("Update project error:", error);
        return { message: "Failed to connect to server." };
    }
};

// 4. حذف مشروع نهائياً
export const deleteProjectRequest = async (id) => {
    try {
        const response = await fetch(`${PROJECTS_API}/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    } catch (error) {
        console.error("Delete project error:", error);
        return { message: "Failed to connect to server." };
    }
};

// ---  الأسماء المستعارة لحل مشكلة التطابق مع Projects.jsx نهائياً ---
export const getAllProjects = getAllProjectsRequest;
export const getProjects = getAllProjectsRequest;
export const createProject = createProjectRequest;
export const updateProject = updateProjectRequest; // تم حل مشكلة السطر 13 هنا
export const deleteProject = deleteProjectRequest;