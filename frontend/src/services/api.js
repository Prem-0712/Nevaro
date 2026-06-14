import axios from 'axios'
import store from '../store/store'
import { setToken, unsetToken } from '../store/authSlice'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// REQUEST INTERCEPTOR
API.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        
        // Don't retry the refresh endpoint itself
        const isRefreshEndpoint = originalRequest.url.includes('/api/account/refresh-tokens/')
        
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isRefreshEndpoint
        ) {
            originalRequest._retry = true
            try {
                const refreshToken = localStorage.getItem('refreshToken')
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/account/refresh-tokens/`,
                    {
                        refresh: refreshToken
                    }
                )
                const newAccessToken = response.data.access
                localStorage.setItem('accessToken', newAccessToken)
                
                const currentState = store.getState()
                store.dispatch(
                    setToken({
                        userRole: currentState.auth.userRole,
                        accessToken: newAccessToken,
                        refreshToken: refreshToken
                    })
                )
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return API(originalRequest)
            }
            catch (refreshError) {
                localStorage.clear()
                store.dispatch(unsetToken())
                window.location.href = '/'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default API