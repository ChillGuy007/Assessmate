// API client for communicating with Assessmate backend
// This file should be placed in frontend src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
function getToken() {
  return localStorage.getItem('assessmate_token');
}

// Set token in localStorage
function setToken(token) {
  if (token) {
    localStorage.setItem('assessmate_token', token);
  }
}

// Remove token from localStorage
function removeToken() {
  localStorage.removeItem('assessmate_token');
}

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// AUTH API
export const authAPI = {
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (email, password, role, firstName, lastName, institution) =>
    apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        role,
        first_name: firstName,
        last_name: lastName,
        institution,
      }),
    }),

  verify: () => apiCall('/auth/verify'),

  setToken,
  getToken,
  removeToken,
};

// USERS API
export const usersAPI = {
  getProfile: (userId) => apiCall(`/users/profile/${userId}`),

  updateProfile: (userId, data) =>
    apiCall(`/users/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAll: () => apiCall('/users'),
};

// COURSES API
export const coursesAPI = {
  getAll: () => apiCall('/courses'),

  getById: (courseId) => apiCall(`/courses/${courseId}`),

  create: (data) =>
    apiCall('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (courseId, data) =>
    apiCall(`/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  enroll: (courseId) =>
    apiCall(`/courses/${courseId}/enroll`, {
      method: 'POST',
    }),
};

// FEEDBACK API
export const feedbackAPI = {
  submit: (data) =>
    apiCall('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getCourseFeedback: (courseId) =>
    apiCall(`/feedback/course/${courseId}`),

  getStats: (courseId) => apiCall(`/feedback/stats/${courseId}`),

  getStudentFeedback: (studentId) =>
    apiCall(`/feedback/student/${studentId}`),
};

// ANALYTICS API
export const analyticsAPI = {
  getDashboard: () => apiCall('/analytics/dashboard'),

  getFacultyAnalytics: (facultyId) =>
    apiCall(`/analytics/faculty/${facultyId}`),
};

// HEALTH CHECK
export const healthCheck = () => apiCall('/auth/verify').catch(() => false);
