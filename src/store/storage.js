// src/stores/counter.js
import { defineStore } from 'pinia'

export const globalStore = defineStore('globalStorage', {
  state: () => ({
    currentView: ''
  }),
  getters: {
    getCurrentView: (state) => state.currentView
  },
  actions: {
    setcurrentView(value) {
      this.currentView = value
    }
  }
})
