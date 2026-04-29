import axios from 'axios';


const axiosInstance = axios.create({
 // In production, this will point to https://your-app.vercel.app/api
  // Vercel will then forward that to your IP internally.
  //https://hometutor.duckdns.org/api
  baseURL: 'http://localhost:10000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Grab the token from local storage
    const token = localStorage.getItem('htss_token');
    
    // If we have a token, attach it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // The token expired or is invalid! 
      localStorage.removeItem('htss_user');
      localStorage.removeItem('htss_token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;