<template>
  <v-app>
    <h2>Add Store</h2>
    <p>여기에서 새로운 매장을 추가하세요.</p>
    <v-main class="d-flex align-center justify-center" style="height: 100vh">
      <v-container style="max-width: 750px">
        <v-card class="pa-10">
          <v-form>
            <v-text-field label="Store Name" v-model="storeName" required></v-text-field>
            <v-text-field label="Address" v-model="address" required></v-text-field>
            <v-text-field label="Phone Number" v-model="phone"></v-text-field>
            <v-text-field label="Business Hours" v-model="businessHour" required></v-text-field>
            <v-text-field label="Staff Count" v-model="staffCount" type="number"></v-text-field>

            <v-btn color="green" block @click="addStore">Add Store</v-btn>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import router from '@/router'
import { useStore } from '@/stores/store'
import { ref } from 'vue'

const store = useStore()

const storeName = ref('')
const address = ref('')
const phone = ref('')
const businessHour = ref('')
const staffCount = ref('')

const addStore = () => {
  if (storeName.value.trim() === '') {
    alert('Store name is required')
    return
  }

  if (address.value.trim() === '') {
    return
  }

  if (staffCount.value < 0) {
    return
  }

  const storeData = {
    id: 1,
    storeName: storeName.value,
    address: address.value,
    phone: phone.value,
    // businessHours: formattedHours,
    staffCount: staffCount.value,
  }

  store.addStore(storeData)

  router.replace('/dashboard')
}
</script>

<style lang="scss" scoped></style>
