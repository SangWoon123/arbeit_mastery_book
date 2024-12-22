import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/plugin/firebase'

export const useAuthService = {
  login: async (email, password) => {
    console.log('zzz')
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("성공",userCredential)
      return userCredential
    } catch (error) {
      throw new Error('Login failed: ' + error.message)
    }
  },
}
