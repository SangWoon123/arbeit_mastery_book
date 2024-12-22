import { defineStore } from 'pinia'
import { getAuth, getIdToken, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('authToken'))
  const isLoading = ref(false) // 로딩 상태 추가
  const error = ref(null) // 에러 상태 추가

  const auth = getAuth()

  // 인증 상태 초기화
  const initializeAuthState = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        user.value = currentUser
        token.value = await currentUser.getIdToken()
        localStorage.setItem('authToken', token.value)
      } else {
        user.value = null
        token.value = null
        localStorage.removeItem('authToken')
      }
    })
  }

  // 로그인 함수
  const login = async (email, password) => {
    try {
      isLoading.value = true
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      token.value = await getIdToken(user.value)
      localStorage.setItem('authToken', token.value) // 로그인 성공 시 토큰 저장
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  initializeAuthState()

  return { user, token, login, isLoading, error }
})
