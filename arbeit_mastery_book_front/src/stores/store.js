import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    stores: [],
  }),

  actions: {
    // 매장 추가
    addStore(storeData) {
      this.stores.push(storeData)
    },
  },

  getters: {
    // 모든 매장 리스트
    getStores(state) {
      return state.stores
    },
    // 특정 매장 정보
    getStoreById: (state) => (storeId) => {
      return state.stores.find((store) => store.id === storeId)
    },
  },
})
