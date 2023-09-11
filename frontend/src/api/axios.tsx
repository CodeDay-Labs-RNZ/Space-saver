import axios from 'axios'


/* creating an instance of the Axios library with base URL for API requests. 
base URL set to the value of the `API_URL` env var, 
or if it not defined, it defaults to `http://localhost:3001`. */
const instance = axios.create({
  baseURL: 'https://space-saver-backend.fly.dev' || process.env.REACT_APP_API_URL || 'http://localhost:3001'
});

// interceptor to add token to request 
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('Token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } 

  return config;
})

export default instance;