const API_URL = 'http://localhost:5000/api/announcements';

export const announcementService = {
    // Get all announcements
    getAllAnnouncements: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching announcements:', error);
            throw error;
        }
    },

    // Create a new announcement
    createAnnouncement: async (announcementData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(announcementData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating announcement:', error);
            throw error;
        }
    },

    // Update an announcement
    updateAnnouncement: async (id, announcementData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(announcementData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating announcement:', error);
            throw error;
        }
    },

    // Delete an announcement
    deleteAnnouncement: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting announcement:', error);
            throw error;
        }
    }
};