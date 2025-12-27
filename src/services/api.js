import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: (userData) => api.post('api/auth/register', userData),
    login: (credentials) => api.post('api/auth/login', credentials),
    create: (data) => api.post("/enquiries", data)
};

export const videoAPI = {
  getAll: () => api.get('/video'),
  getAdd: (data) => api.post('/video',data),
};

// ---------------- ADMIN ----------------
export const adminAPI = {
  addPatient: (data) => api.post("/admin/addpatient", data),
  sendNotification:(data)=> api.post("/admin/notification",data),
  getNotifications:()=>api.get("/admin/notification")
};

// ----------- APPOINTMENT ----------------------

export const appointmentAPI={
   takeAppointment:(data)=> api.post("/appointment",data),
   getAllAppointments:()=>api.get("/appointment"),
   deleteAppointment: (id) => api.delete(`appointment/${id}`)
}

// --------- Chat APi --------------

export const chatApi={
   sendChat:(message)=>api.post("/chat",message),
   getChat:()=>api.get("/chat")
}


// -----------Enquiry Api ---------------

export const inquiryAPI={
  createInquery:(data)=>api.post("/enquiries",data),
  getAllEnquiries:()=>api.get("/enquiries")
}




// ----------- CONTACT API ---------------
export const contactAPI = {
    sendMessage: (data) => api.post('/api/contact', data)
};



export default api;