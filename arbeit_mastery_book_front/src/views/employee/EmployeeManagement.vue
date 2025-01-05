<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <h2>직원 관리</h2>
        <v-btn color="indigo" flat @click="openDialog">
          <span>+</span>
          <v-icon>mdi-account</v-icon>
          <span>직원 등록</span>
        </v-btn>
      </v-card-title>

      <v-card-subtitle> 직원 정보를 검색하고 관리합니다. </v-card-subtitle>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="이름 검색"
              prepend-inner-icon="mdi-magnify"
              v-model="inputMsg"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="startDate"
              label="시작일"
              variant="outlined"
              density="compact"
              type="date"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="endDate"
              label="종료일"
              variant="outlined"
              density="compact"
              type="date"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3" style="display: flex; gap: 5px">
            <v-btn @click="updateSearch" color="teal"> 검색 </v-btn>
            <v-btn @click="resetEmployee" color="secondary" variant="outlined">초기화</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-table class="elevation-1">
          <thead>
            <tr>
              <th class="text-subtitle-1">번호</th>
              <th class="text-subtitle-1">이름</th>
              <th class="text-subtitle-1">핸드폰번호</th>
              <th class="text-subtitle-1">일</th>
              <th class="text-subtitle-1">시간</th>
              <th class="text-subtitle-1">시작</th>
              <th class="text-subtitle-1">끝</th>
              <th class="text-subtitle-1">급여</th>
              <th class="text-subtitle-1 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.phone }}</td>
              <td>{{ employee.scheduleDate }}</td>
              <td>{{ employee.scheduleTime }}</td>
              <td>{{ employee.start }}</td>
              <td>{{ employee.end }}</td>
              <td>{{ employee.salary }}</td>
              <td class="text-center">
                <v-btn icon="mdi-pencil-outline" color="primary" variant="text"></v-btn>
                <v-btn icon="mdi-dots-horizontal" color="secondary" variant="text"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>

      <AddEmployeeDialog
        v-if="dialog"
        :dialog="dialog"
        @update:dialog="dialog = $event"
        @save-employee="saveEmployee"
      />
    </v-card>
  </v-container>
</template>

<script setup>
import { useEmployeeStore } from '@/stores/employee'
import AddEmployeeDialog from './AddEmployeeDialog.vue'
import { computed, ref } from 'vue'

const employeeStore = useEmployeeStore()
const dialog = ref(false)
const startDate = ref('')
const endDate = ref('')
const inputMsg = ref('')

const openDialog = () => {
  dialog.value = true
}

const saveEmployee = (employee) => {
  employeeStore.addEmployee(employee)
}

const employees = ref(employeeStore.employees)

const updateSearch = () => {
  employees.value = employeeStore.employees.filter((employee) => {
    const matchesName = inputMsg.value ? employee.name.includes(inputMsg.value) : true
    const matchesStartDate = startDate.value ? employee.start >= startDate.value : true
    const matchesEndDate = endDate.value ? employee.end <= endDate.value : true

    return matchesName && matchesStartDate && matchesEndDate
  })
}

const resetEmployee = () => {
  inputMsg.value = ''
  startDate.value = ''
  endDate.value = ''

  employees.value = [
    {
      name: '홍길동',
      phone: '010-1234-5678',
      scheduleDate: '월, 수, 금',
      scheduleTime: '09:00 ~ 18:00',
      start: '2025-01-01',
      end: '2025-02-21',
      salary: '300만원',
    },
    {
      name: '김철수',
      phone: '010-8765-4321',
      scheduleDate: '월, 수, 금',
      scheduleTime: '09:00 ~ 18:00',
      start: '2023-12-01',
      end: '2025-02-21',
      salary: '250만원',
    },
    {
      name: '박민지',
      phone: '010-8765-4321',
      scheduleDate: '월, 수, 금',
      scheduleTime: '09:00 ~ 18:00',
      start: '2022-12-01',
      end: '2023-02-21',
      salary: '250만원',
    },
  ]
}

const filteredEmployees = computed(() => {
  return employees.value.filter((employee) => {
    return (
      employee.name.includes(inputMsg.value) ||
      (startDate.value &&
        endDate.value &&
        employee.start >= startDate.value &&
        employee.end <= endDate.value)
    )
  })
})
</script>

<style scoped></style>
