import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Preferences } from '../types'
import { loadPreferences, savePreferences } from '../services/preferences'

export const usePreferencesStore = defineStore('preferences', () => {
  const value = ref(loadPreferences())
  function update(patch: Partial<Preferences>) {
    value.value = { ...value.value, ...patch }
    savePreferences(value.value)
  }
  return { value, update }
})
