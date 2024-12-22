<template>
  <v-app>
    <v-main class="blue-grey lighten-4 d-flex align-center justify-center" style="height: 100vh">
      <v-container style="max-width: 450px">
        <v-card class="pa-10">
          <h1 class="text-center mb-10">アルバイト</h1>
          <v-form>
            <v-text-field
              label="ID"
              v-model="email"
              prepend-inner-icon="mdi-account"
              outlined
              class="mb-4"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              prepend-inner-icon="mdi-lock"
              type="password"
              outlined
              class="mb-4"
            ></v-text-field>
            <v-btn @click.prevent="login" color="blue lighten-1" block large class="mb-3">
              Login
            </v-btn>
            <v-btn @click="addSignUp" color="blue lighten-1" block large> Sign Up </v-btn>
            <p v-if="error" class="error">{{ error }}</p>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const email = ref('')
const password = ref('')

const authStore = useAuthStore()

const login = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const { isLoading, error } = authStore
function addSignUp() {
  router.push('/signup')
}
</script>
