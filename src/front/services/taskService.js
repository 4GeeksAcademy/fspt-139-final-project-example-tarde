const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getTasks = async () => {

    const response = await fetch(
        `${BACKEND_URL}/api/tasks`
    );

    if (!response.ok) {
        throw new Error("Error loading tasks");
    }

    return await response.json();
};