// استيراد الرابط الأساسي من ملف api.js الذي أنشأته
import API_URL from "./api";

// دالة تسجيل الدخول المستقلة
export const loginRequest = async (username, password) => {
    try {
        // ندمج الرابط الأساسي مع مسار الـ auth
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        
        return await response.json();
    } catch (error) {
        console.error("Auth Service Error:", error);
        return { success: false, message: "Cannot connect to the server." };
    }
};