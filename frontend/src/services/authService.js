import axios from 'axios'
import API from './api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Login bypasses interceptor (no tokens yet)
export const loginUser = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/api/account/login/`,
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )
  return { data: response.data, status: response.status }
}

// All other endpoints use API (with interceptor)
export const registerUser = async (formData) => {
  const response = await API.post('/api/account/register/', formData)
  return response.data
}

export const getSellerProfile = async () => {
  const response = await API.get('/api/seller/get-profile/')
  return { data: response.data, status: response.status }
}

export const updateSellerProfile = async (formData) => {
  const response = await API.patch('/api/seller/update-profile/', formData)
  return { data: response.data, status: response.status }
}

export const deleteSeller = async () => {
  const response = await API.delete('/api/seller/delete-seller/')
  return { data: response.data, status: response.status }
}