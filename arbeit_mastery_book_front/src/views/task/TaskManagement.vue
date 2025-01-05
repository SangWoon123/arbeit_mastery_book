<template>
  <v-container style="max-width: 820px">
    <v-card class="pa-5 ma-2">
      <v-card-title>Add New Task</v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="addTask">
        <v-text-field
          label="Task Title"
          v-model="taskTitle"
          :rules="[v => !!v || 'Title is required']"
          required
        ></v-text-field>
        <v-textarea label="Description" v-model="description"></v-textarea>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Start Time"
              v-model="startTime"
              type="time"
              :rules="[v => !!v || 'Start time is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="End Time"
              v-model="endTime"
              type="time"
              :rules="[v => !!v || 'End time is required']"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field label="Assignee" v-model="assignee"></v-text-field>
        <v-card-actions>
          <v-btn color="success" type="submit">Add Task</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const taskTitle = ref('');
const description = ref('');
const startTime = ref('');
const endTime = ref('');
const assignee = ref('');

const addTask = () => {
  console.log('Task added:', {
    taskTitle: taskTitle.value,
    description: description.value,
    startTime: startTime.value,
    endTime: endTime.value,
    assignee: assignee.value,
  });
  // TODO: Implement actual task submission logic
};
</script>

<style scoped>
.v-card {
  background-color: #f8f8f8;
}

.v-text-field {
  margin-bottom: 10px;
}
</style>
