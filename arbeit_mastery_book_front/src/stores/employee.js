import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [
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
    ],
  }),
  getters: {
    getEmployees() {
      return this.employees
    },
  },
  actions: {
    addEmployee(newEmployee) {
      this.employees.push(newEmployee)
    },
  },
})
