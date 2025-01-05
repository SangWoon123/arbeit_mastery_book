<template>
  <v-app>
    <h2>DashBoard</h2>
    <p>대시보드 화면: 매장별 상태, 알림 등</p>
    <v-main class="d-flex align-center justify-center" style="height: 100vh">
      <v-container style="max-width: 750px">
        <div>{{ adminName }}님 안녕하세요</div>
        <ul>
          <!-- 최대 3개의 매장만 표시 -->
          <li v-for="(item, index) in items" class="mb-3" :key="index">
            <v-card
              height="120"
              class="d-flex align-center justify-center"
              block
              @click="goToStoreDashBoard(item.id)"
            >
              <p>{{ item.id }}</p>
              <p>{{ item.storeName }}</p>
              <p>{{ item.address }}</p>
              <p>{{ item.address }}</p>
            </v-card>
          </li>

          <!-- 매장 등록 버튼 -->
          <li v-for="(_, index) in 3 - items.length" :key="index" class="mb-3">
            <v-card
              height="120"
              class="d-flex align-center justify-center"
              block
              @click="goToAddStore"
            >
              <h3>매장 추가</h3>
            </v-card>
          </li>
        </ul>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useStore } from '@/stores/store'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const items = store.getStores

const authStore = useAuthStore()
const adminName = computed(() => (authStore.user ? authStore.user.displayName : '사용자'))

const goToAddStore = () => {
  router.push({ name: 'AddStore' })
}

function goToStoreDashBoard(id) {
  router.push(`/store/${id}`)
}

onMounted(() => {
  authStore.initializeAuthState()
})
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
