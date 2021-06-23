import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/'})

export const fetchDetail = () => API.get('/getMenu');
export const addDetail = (newDetail) => API.post('/getMenu', newDetail);


export const signIn  = (formData) => API.post('/admin/signin', formData)
export const signUp  = (formData) => API.post('/admin/signup', formData)