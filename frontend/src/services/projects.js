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

// 2. إرسال مشروع جديد (تعديل ليدعم الصور والـ FormData)
export const createProjectRequest = async (projectData) => {
    try {
        // نتحقق إذا كانت البيانات القادمة هي FormData (لرفع الصور) أو كائن عادي
        const isFormData = projectData instanceof FormData;

        const response = await fetch(PROJECTS_API, {
            method: "POST",
            // إذا كانت FormData نترك المتصفح يضع الـ headers تلقائياً، وإلا نضع الـ JSON
            headers: isFormData ? {} : {
                "Content-Type": "application/json",
            },
            // لا نستخدم JSON.stringify إذا كانت البيانات FormData
            body: isFormData ? projectData : JSON.stringify(projectData),
        });
        return await response.json();
    } catch (error) {
        console.error("Create project error:", error);
        return { message: "Failed to connect to server." };
    }
};

// 3. تحديث مشروع موجود
export const updateProjectRequest = async (id, projectData) => {
    try {
        const isFormData = projectData instanceof FormData;

        const response = await fetch(`${PROJECTS_API}/${id}`, {
            method: "PUT",
            headers: isFormData ? {} : {
                "Content-Type": "application/json",
            },
            body: isFormData ? projectData : JSON.stringify(projectData),
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

// ---  الأسماء المستعارة لحل مشكلة التطابق نهائياً ---
export const getAllProjects = getAllProjectsRequest;
export const getProjects = getAllProjectsRequest;
export const createProject = createProjectRequest;
export const updateProject = updateProjectRequest; 
export const deleteProject = deleteProjectRequest;