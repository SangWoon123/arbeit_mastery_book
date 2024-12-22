<template>
  <v-app>
    <v-main class="blue-grey lighten-4 d-flex align-center justify-center" style="height: 100vh">
      <v-container style="max-width: 450px">
        <v-card class="pa-10">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  type="email"
                  label="E-mail"
                  v-model="email"
                  :rules="[emailRule]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  hint="At least 8 characters"
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  @click:append="togglePasswordVisibility"
                  :rules="[passwordRule]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="confirmPassword"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Confirm Password"
                  @click:append="togglePasswordVisibility"
                  :rules="[confirmPasswordRule]"
                  required
                ></v-text-field>
              </v-col>
              <v-btn @click="signUp" color="green lighten-1" block class="mb-3">Register</v-btn>
              <v-btn @click="goToLogin" color="blue lighten-1" block large class="mb-3">
                For Login
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToLogin = () => {
  router.push('/')
}
const show1 = ref(false)
const form = ref()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const togglePasswordVisibility = () => {
  show1.value = !show1.value
}

// 이메일 유효성 검사
const emailRule = (value) => {
  if (!value) {
    return 'E-mail is required'
  }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailPattern.test(value)) {
    return 'Please enter a valid email address'
  }
  return true
}

// 비밀번호 유효성 검사
const passwordRule = (value) => {
  if (!value) {
    return 'Password is required'
  }
  if (value.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return true
}

// 비밀번호 확인 유효성 검사
const confirmPasswordRule = (value) => {
  if (!value) {
    return 'Please confirm your password'
  }
  if (value !== password.value) {
    return 'Passwords do not match'
  }
  return true
}
const auth = getAuth()
const signUp = async () => {
  // const isValid = await form.value
  // if (!isValid) {
  //   return
  // }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    console.log('Logged in as:', user.email)
  } catch (error) {
    console.error('Login failed:', error.message)
  }
}
</script>
