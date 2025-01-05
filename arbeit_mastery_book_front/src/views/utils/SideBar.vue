<template>
  <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent>
    <v-list color="transparent">
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dashboard"
        @click="navigateTo('/dashboard')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-box"
        title="Store"
        value="store"
        @click="navigateTo(`/store/${route.params.id}`)"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-box"
        title="Account"
        value="account"
        @click="navigateTo(`/store/${route.params.id}/employee`)"
      ></v-list-item>
      <v-list-item prepend-icon="mdi-gavel" title="Admin" value="admin"></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logOut"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

async function logOut() {
  await authStore.logout()
  router.replace('/')
}
function navigateTo(path) {
  if (router.currentRoute.value.fullPath !== path) { // 다른 url에서 이동될때만 수행
    router.push(path)
  }
}
</script>

<style scoped></style>
