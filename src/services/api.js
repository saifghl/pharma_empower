import axios from 'axios';

/* ================= BASE URL ================= */
const API_BASE_URL = (
  process.env.REACT_APP_API_URL ||
  'https://pharma-empowerr.onrender.com'
).replace(/\/$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // ✅ safer (you use Bearer token, not cookies)
});

/* ================= TOKEN INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= AUTH ================= */
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
};

/* ================= SKILLS ================= */
export const skillAPI = {
  getAll: () => api.get('/api/skills'),
  getUserSkills: () => api.get('/api/skills/my-skills'),
  updateUserSkill: (data) => api.post('/api/skills/my-skills', data),
};

/* ================= COMMUNITY ================= */
export const communityAPI = {
  getQA: () => api.get('/api/community/public'),

  askQuestion: (data) =>
    api.post('/api/community/ask', {
      name: data.name,
      query: data.query,
    }),

  getAllAdmin: () => api.get('/api/admin/community/pending'),
  answerQuestion: (id, data) =>
    api.put(`/api/admin/community/answer/${id}`, data),
};

/* ================= USERS ================= */
export const userAPI = {
  getAllUsers: () => api.get('/api/users'),
  updateUserRole: (id, role) =>
    api.put(`/api/users/${id}/role`, { role }),
  updateUserStatus: (id, is_blocked) =>
    api.put(`/api/users/${id}/status`, { is_blocked }),
};

/* ================= CMS ================= */
export const cmsAPI = {
  getPage: (slug) => api.get(`/api/pages/${slug}`),
  updatePage: (slug, data) => api.put(`/api/pages/${slug}`, data),
};

/* ================= VIDEO ================= */
export const videoAPI = {
  getAll: () => api.get('/api/video'),
  add: (data) => api.post('/api/video', data),
};

/* ================= ADMIN ================= */
export const adminAPI = {
  addPatient: (data) => api.post('/api/admin/addpatient', data),
  sendNotification: (data) => api.post('/api/admin/notification', data),
  getNotifications: () => api.get('/api/admin/notification'),
};

/* ================= CALENDAR ================= */
export const calendarAPI = {
  createRequest: (data) => api.post('/api/calendar/requests', data),
  getAdminRequests: () => api.get('/api/calendar/admin/requests'),
  updateStatus: (data) =>
    api.put('/api/calendar/admin/update-status', data),
};

/* ================= APPOINTMENT ================= */
export const appointmentAPI = {
  takeAppointment: (data) => api.post('/api/appointment', data),
  getAllAppointments: () => api.get('/api/appointment'),
  deleteAppointment: (id) => api.delete(`/api/appointment/${id}`),
};

/* ================= EVENTS ================= */
export const eventAPI = {
  getAll: () => api.get('/api/events'),
  create: (data) => api.post('/api/events', data),
  getById: (id) => api.get(`/api/events/${id}`),
};

/* ================= CHAT ================= */
export const chatApi = {
  sendChat: (message) => api.post('/api/chat', message),
  getChat: () => api.get('/api/chat'),
};

/* ================= ENQUIRY ================= */
export const inquiryAPI = {
  createInquiry: (data) => api.post('/api/enquiries', data),
  getAllEnquiries: () => api.get('/api/enquiries'),
};

/* ================= NEWS ================= */
export const newsAPI = {
  getNews: () => api.get('/api/news'),
};

/* ================= SESSION ================= */
export const sessionAPI = {
  createSession: (data) => api.post('/api/sessions', data),
  getAllSessions: () => api.get('/api/sessions'),
  deleteSession: (id) => api.delete(`/api/sessions/${id}`),
};

/* ================= CONTACT ================= */
export const contactAPI = {
  sendMessage: (data) => api.post('/api/contact', data),
  getAll: () => api.get('/api/contact'),
  markAsRead: (id) => api.put(`/api/contact/${id}/read`),
};

/* ================= DASHBOARD ================= */
export const dashboardAPI = {
  getStats: () => api.get('/api/admin/dashboard/stats'),
};

export default api;
