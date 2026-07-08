import API_URL from "./api";

// GET
export async function getProjects() {
    const response = await fetch(`${API_URL}/projects`);

    if (!response.ok) {
        throw new Error("Failed to fetch projects.");
    }

    return await response.json();
}

// POST
export async function createProject(project) {
    const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });

    return await response.json();
}

// PUT
export async function updateProject(id, project) {
    const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });

    return await response.json();
}

// DELETE
export async function deleteProject(id) {
    const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
    });

    return await response.json();
}