import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://space-saver-backend.fly.dev'
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