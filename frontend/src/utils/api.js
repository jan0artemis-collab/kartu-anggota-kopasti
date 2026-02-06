// Configure your Apps Script Web App URL here
export const API_BASE_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

export const api = {
  async getMembers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}${queryString ? '?' + queryString : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  },

  async getMemberById(id) {
    const url = `${API_BASE_URL}?id=${id}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch member');
    return response.json();
  }
};
