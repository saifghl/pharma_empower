import axios from 'axios';

// ✅ Render backend URL (IMPORTANT: no localhost)
//const API_BASE_URL = 'http://localhost:5000'; // Changed to local for dev, revert before deploy
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
};


/* ================= SKILLS ================= */
export const skillAPI = {
  getAll: () => api.get('/api/skills'),
  getUserSkills: () => api.get('/api/skills/my-skills'),
  updateUserSkill: (data) => api.post('/api/skills/my-skills', data),
};

/* ================= COMMUNITY ================= */
export const communityAPI = {
  // USER
  getQA: () => api.get('/api/community/public'),

  // ✅ FIXED
  askQuestion: (data) =>
    api.post('/api/community/ask', {
      name: data.name,
      query: data.query,
    }),

  // ADMIN
  getAllAdmin: () => api.get('/api/admin/community/pending'),
  answerQuestion: (id, data) =>
    api.put(`/api/admin/community/answer/${id}`, data),
};


/* ================= USER ACCESS CONTROL ================= */
export const userAPI = {
  getAllUsers: () => api.get('/api/users'),
  updateUserRole: (id, role) =>
    api.put(`/api/users/${id}/role`, { role }),
  updateUserStatus: (id, is_blocked) =>
    api.put(`/api/users/${id}/status`, { is_blocked }),
};



/* ================= CMS (PAGES) ================= */
export const cmsAPI = {
  getPage: (slug) => api.get(`/api/pages/${slug}`),
  updatePage: (slug, data) => api.put(`/api/pages/${slug}`, data),
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

/* ================= CALENDAR ================= */
export const calendarAPI = {
  createRequest: (data) => api.post('/api/calendar/requests', data),
  getAdminRequests: () => api.get('/api/calendar/admin/requests'),
  updateStatus: (data) =>
    api.put('/api/calendar/admin/update-status', data),
};


/* ================= APPOINTMENT ================= */
export const appointmentAPI = {
  takeAppointment: (data) => api.post('/appointment', data),
  getAllAppointments: () => api.get('/appointment'),
  deleteAppointment: (id) => api.delete(`/appointment/${id}`),
};

/* ================= EVENTS ================= */
export const eventAPI = {
  getAll: () => api.get('/api/events'),
  create: (data) => api.post('/api/events', data),
  getById: (id) => api.get(`/api/events/${id}`),
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
  createSession: (data) => api.post('/api/sessions', data), // Fixed route path
  getAllSessions: () => api.get('/api/sessions'),
  deleteSession: (id) => api.delete(`/api/sessions/${id}`),
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
