import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/'})

export const fetchDetail = () => API.get('/getMenu');
export const addDetail = (newDetail) => API.post('/getMenu', newDetail);
export const updateDetail = (id, updateDetail ) =>  API.patch(`/getMenu/${id}`, updateDetail);
export const deleteDetail = (id) => API.delete(`/getMenu/${id}`);


export const signIn  = (formData) => API.post('/admin/signin', formData)
export const signUp  = (formData) => API.post('/admin/signup', formData)