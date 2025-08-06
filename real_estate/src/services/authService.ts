import api from '@/services/api'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    login(token: string) {
      this.token = token
      localStorage.setItem('authToken', token)
    },
    logout() {
      this.token = null
      localStorage.removeItem('authToken')
    }
  }
})


export const AuthService = {
    async login(loginMail: string, loginPassword: string){
        try {
            const response = await api.post('/Auth/login', {
                mail: loginMail,
                password: loginPassword
            })
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token)
                sessionStorage.setItem('authUpdate', Date.now().toString())
            }
            return response.data
        } catch (error) {
            throw error
        }
    },
    async register(registerMail: string, registerPassword: string){
        try {
            const response = await api.post('/Auth/register', {
                mail: registerMail,
                password: registerPassword
            })
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token)
            }
            return response.data
        } catch (error) {
            throw error
        }
    },
    logout() {
        console.log('Успешный выход пользователя')
        localStorage.removeItem('authToken')
        sessionStorage.setItem('authUpdate', Date.now().toString())
    },
    getToken() {
    return localStorage.getItem('authToken')
  }
}