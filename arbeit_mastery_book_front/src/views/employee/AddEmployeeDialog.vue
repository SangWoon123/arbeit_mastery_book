<template>
  <v-dialog v-model="localDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span>직원 등록</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="employee.name" label="이름" required></v-text-field>
          <v-text-field v-model="employee.phone" label="핸드폰 번호" required></v-text-field>
          <v-select
            v-model="employee.scheduleDays"
            :items="days"
            label="스케줄 일"
            multiple
            chips
            required
          ></v-select>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="employee.scheduleStartTime" label="시작 시간" type="time" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="employee.scheduleEndTime" label="끝날 시간" type="time" required></v-text-field>
            </v-col>
          </v-row>
          <v-text-field v-model="employee.contractStart" label="계약 시작일" type="date" required></v-text-field>
          
          <v-row>
            <v-col cols="6">
              <v-btn-toggle v-model="contractType" mandatory>
                <v-btn value="direct">직접입력</v-btn>
                <v-btn value="months">개월</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="contractType === 'direct'"
                v-model="employee.contractEnd"
                label="계약 만료일"
                type="date"
                required
              ></v-text-field>
              <v-select
                v-if="contractType === 'months'"
                v-model="employee.contractMonths"
                :items="months"
                label="계약 개월"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">취소</v-btn>
        <v-btn color="blue darken-1" text @click="saveEmployee">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  dialog: Boolean,
  saveEmployee: Function,
});

const emit = defineEmits(['update:dialog', 'save-employee']);

const localDialog = ref(props.dialog);
const contractType = ref('direct');
const days = ['월', '화', '수', '목', '금', '토', '일'];
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}개월`);

const employee = ref({
  name: '',
  phone: '',
  scheduleDays: [],
  scheduleStartTime: '',
  scheduleEndTime: '',
  contractStart: '',
  contractMonths: '',
  contractEnd: '',
});

watch(() => props.dialog, (newVal) => {
  localDialog.value = newVal;
});

watch(localDialog, (newVal) => {
  emit('update:dialog', newVal);
});

const saveEmployee = () => {
  if (employee.value.name && employee.value.phone && employee.value.scheduleDays.length && employee.value.scheduleStartTime && employee.value.scheduleEndTime) {
    const newEmployee=newForm();
    emit('save-employee', newEmployee);
    closeDialog();
    resetForm();
  }
}


const newForm = () => {
  const form = {
    name: employee.value.name,
    phone: `${employee.value.phone.slice(0, 3)}-${employee.value.phone.slice(3, 7)}-${employee.value.phone.slice(7)}`,
    scheduleDate: employee.value.scheduleDays.join(', '),
    scheduleTime: `${employee.value.scheduleStartTime} ~ ${employee.value.scheduleEndTime}`,
    start: employee.value.contractStart,
    end: employee.value.contractEnd,
    salary: employee.value.salary
  };
  return form;
};
const closeDialog = () => {
  localDialog.value = false;
};

const resetForm = () => {
  employee.value = {
    name: '',
    phone: '',
    scheduleDays: [],
    scheduleStartTime: '',
    scheduleEndTime: '',
    contractStart: '',
    contractMonths: '',
    contractEnd: '',
  };
};
</script>

<style scoped>
</style>