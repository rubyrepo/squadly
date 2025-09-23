const BASE_URL = 'http://localhost:5000';

export const getAnnouncements = async () => {
  const response = await fetch(`${BASE_URL}/announcements`);
  if (!response.ok) throw new Error('Failed to fetch announcements');
  return response.json();
};

export const createAnnouncement = async (announcement) => {
  const response = await fetch(`${BASE_URL}/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(announcement)
  });
  if (!response.ok) throw new Error('Failed to create announcement');
  return response.json();
};

export const updateAnnouncement = async (id, announcement) => {
  const response = await fetch(`${BASE_URL}/announcements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(announcement)
  });
  if (!response.ok) throw new Error('Failed to update announcement');
  return response.json();
};

export const deleteAnnouncement = async (id) => {
  const response = await fetch(`${BASE_URL}/announcements/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete announcement');
  return response.json();
};