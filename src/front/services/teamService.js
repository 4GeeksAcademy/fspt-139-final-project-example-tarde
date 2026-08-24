const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getTeam = async () => {

    const response = await fetch(
        `${BACKEND_URL}/api/team`
    );

    if (!response.ok) {
        throw new Error("Error loading team");
    }

    return await response.json();
};