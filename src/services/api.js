import axios from 'axios';

// ✅ Render backend URL (IMPORTANT: no localhost)
const API_BASE_URL = 'https://pharma-empowerr.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach auth token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // SAME token for user & admin
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= AUTH ================= */
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  // Legacy support if needed, but above covers it with better naming
};

/* ================= VIDEO ================= */
export const videoAPI = {
  getAll: () => api.get('/video'),
  add: (data) => api.post('/video', data),
};

/* ================= ADMIN ================= */
export const adminAPI = {
  addPatient: (data) => api.post('/admin/addpatient', data),
  sendNotification: (data) => api.post('/admin/notification', data),
  getNotifications: () => api.get('/admin/notification'),
};

/* ================= APPOINTMENT ================= */
export const appointmentAPI = {
  takeAppointment: (data) => api.post('/appointment', data),
  getAllAppointments: () => api.get('/appointment'),
  deleteAppointment: (id) => api.delete(`/appointment/${id}`),
};

/* ================= CHAT ================= */
export const chatApi = {
  sendChat: (message) => api.post('/chat', message),
  getChat: () => api.get('/chat'),
};

/* ================= ENQUIRY ================= */
export const inquiryAPI = {
  createInquiry: (data) => api.post('/enquiries', data),
  getAllEnquiries: () => api.get('/enquiries'),
};

/* ================= NEWS ================= */
export const newsAPI = {
  getNews: () => api.get('/api/news'),
};

/* ================= SESSION ================= */
export const sessionAPI = {
  createSession: (data) => api.post('/api/session', data),
  getAllSessions: () => api.get('/api/session'),
  deleteSession: (id) => api.delete(`/api/session/${id}`),
  // Note: Local code favored singular /api/session. Remote server.js used plural /sessions but remote api.js used singular. Keeping singular.
};

/* ================= CONTACT ================= */
export const contactAPI = {
  sendMessage: (data) => api.post('/api/contact', data),
  getAll: () => api.get('/api/contact'),
  markAsRead: (id) => api.put(`/api/contact/${id}/read`),
};

/* ================= DASHBOARD (ADMIN) ================= */
export const dashboardAPI = {
  getStats: () => api.get('/api/admin/dashboard/stats'),
};

export default api;
