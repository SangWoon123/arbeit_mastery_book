import { defineStore } from 'pinia'
import {
  getAuth,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken'),
    isLoading: false,
  }),

  actions: {
    // 인증 상태 초기화
    initializeAuthState() {
      const auth = getAuth()

      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          this.user = currentUser
          this.token = await currentUser.getIdToken()
          localStorage.setItem('authToken', this.token)
        } else {
          this.user = null
          this.token = null
          localStorage.removeItem('authToken')
        }
      })
    },

    // 회원가입 함수
    async signUp(email, password, name) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password)
        await updateProfile(getAuth().currentUser, {
          displayName: name,
        })
        this.user = getAuth().currentUser
        this.token = await getIdToken(this.user)
        localStorage.setItem('authToken', this.token)
      } catch (error) {
        console.error('SignUp failed:', error.message)
      }
    },

    // 로그인 함수
    async login(email, password) {
      try {
        this.isLoading = true
        const userCredential = await signInWithEmailAndPassword(getAuth(), email, password)
        this.user = userCredential.user
        this.token = await getIdToken(this.user)
        localStorage.setItem('authToken', this.token) // 로그인 성공 시 토큰 저장
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },

    // 로그아웃 함수
    async logout() {
      const auth = getAuth()

      try {
        this.isLoading = true
        await signOut(auth)
        this.user = null
        this.token = null
        localStorage.removeItem('authToken')
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
})
