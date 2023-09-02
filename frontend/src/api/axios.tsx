import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001'
});

/* interceptor to add token to request */
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('Token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } 

  return config;
})

export default instance;