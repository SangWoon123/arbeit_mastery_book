<template>
  <v-card class="content-card" outlined>
    <!-- 작업 정보 -->
    <div class="d-flex justify-space-between">
      <span>{{ taskTitle }}</span>
      <span>{{ taskTime }}</span>
    </div>
    <div style="height: 2rem">{{ taskData }}</div>

    <!-- 이미지 리스트 -->
    <div class="image-list">
      <li v-for="i in imageCount" :key="i">
        <div class="image-placeholder"></div>
      </li>
    </div>

    <!-- 담당 인원 (하단) -->
    <v-card-actions class="d-flex justify-end">
      <v-avatar v-for="(avatar, index) in avatars" :key="index" size="30" :color="avatar.color">
        <img :src="avatar.src" alt="User Avatar" />
      </v-avatar>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  taskTitle: {
    type: String,
    required: true,
  },
  taskTime: {
    type: String,
    required: true,
  },
  taskData: {
    type: String,
    required: false,
    default: '',
  },
  imageCount: {
    type: Number,
    required: true,
  },
  avatars: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<style scoped>
.content-card {
  width: 400px;
  height: 220px;
  margin: 5px;
  padding: 16px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.d-flex.justify-space-between > span:first-child {
  font-size: 1.1rem;
  font-weight: bold;
}

.d-flex.justify-space-between > span:last-child {
  font-size: 0.9rem;
  color: #777;
}

[style*="height"] {
  font-size: 1rem;
  margin-top: 8px;
  margin-bottom: 12px;
}

.image-list {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.image-placeholder {
  width: 30px;
  height: 30px;
  background-color: #ddd;
  border-radius: 4px;
}

.v-card-actions {
  padding: 0;
}

.v-avatar {
  margin-left: 4px;
}
</style>
