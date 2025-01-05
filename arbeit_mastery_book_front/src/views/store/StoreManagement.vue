<template>
  <v-app>
    <SideBar />
    <v-main class="main-layout">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useStore } from '@/stores/store'
import SideBar from '../utils/SideBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()
const storeId = route.params.id

const storeData = store.getStoreById(storeId)
</script>

<style scoped>
/* 레이아웃 스타일 */
.main-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-top: 20px;
}

/* 카드 스타일 */
.content-card {
  width: 400px;
  height: 220px;
  margin: 5px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 이미지 리스트 스타일 */
.image-list {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.image-placeholder {
  width: 30px;
  height: 30px;
  background-color: grey;
}

/* 하단 아바타 스타일 */
v-card-actions {
  padding-top: 8px;
}
</style>
