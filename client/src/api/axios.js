import axios from 'axios';

//setting base url
const api= axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

//setting interceptor or middleware type functioning
api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token");

        if(token){//added token in header everytime we use api
            config.headers.Authorization= `Bearer ${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default api;