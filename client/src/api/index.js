import https from 'https';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  hostname: process.env.REACT_APP_API_HOST || 'http://localhost:3000/',
  httpsAgent: https.Agent({
    rejectUnauthorized: false,
  }),
});

// TODO - use interceptors for better error handling: https://masteringjs.io/tutorials/axios/interceptors#error-handling

export const getAllItems = payload => api.get(`/items`, payload);
export const getAllPatients = payload => api.get(`/patients`, payload);
export const getAllExams = payload => api.get(`/exams`, payload);
export const getAllAdmin = payload => api.get(`/admin`, payload);
export const getItemById = id => api.get(`/item/${id}`);
export const insertItem = payload => api.post(`/item`, payload);
export const updateItemById = (id, payload) => api.put(`/item/${id}`, payload);
export const deleteItemById = id => api.delete(`/item/${id}`);



const apis = {
  getAllItems,
  getAllPatients,
  getAllExams,
  getItemById,
  insertItem,
  updateItemById,
  deleteItemById,
  getAllAdmin,
  getAllPatients,
  getAllExams
};

export default apis;
