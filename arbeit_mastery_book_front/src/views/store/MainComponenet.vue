<template>
  <!-- Header -->
  <v-card max-width="90%" class="header-card d-flex align-center justify-center" outlined>
    <h1>Store Management</h1>
  </v-card>

  <!-- Employees Section -->
  <v-card class="employees ma-2 d-flex align-center justify-center" outlined>
    <div>
      <span>인원 배치</span>
    </div>
  </v-card>

  <div class="content-section">
    <!-- Content Section -->
    <div class="content-container">
      <v-container>
        <ul>
          <li v-for="task in tasks" :key="task.id">
            <TaskCard
              :taskTitle="task.title"
              :taskTime="task.time"
              :taskData="task.data"
              :imageCount="task.imageCount"
              :avatars="task.avatars"
            />
          </li>
        </ul>
      </v-container>
    </div>

    <!-- Card Add Section -->
    <TaskManagement />
  </div>
</template>

<script setup>
import TaskManagement from '../task/TaskManagement.vue'
import TaskCard from '../task/TaskCard.vue'

const tasks = [
  {
    id: 1,
    title: '계단 앞 청소',
    time: '17:00~17:30',
    data: '데이터',
    imageCount: 10,
    avatars: [
      { src: '', color: 'red' },
      { src: '', color: 'blue' },
    ],
  },
  {
    id: 2,
    title: '창고 정리',
    time: '18:00~18:30',
    data: '데이터',
    imageCount: 5,
    avatars: [
      { src: '', color: 'green' },
      { src: '', color: 'yellow' },
    ],
  },
]
</script>

<style scoped>
/* 기본 스타일 */
li {
  list-style: none;
}
.header-card {
  width: 90%;
  height: 90px;
}

.employees {
  width: 80%;
  height: 3.5rem;
}

.content-section {
  display: flex;
  width: 90%;
}
.content-container {
  display: flex;
  justify-content: center;
}
</style>
