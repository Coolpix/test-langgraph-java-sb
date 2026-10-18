import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePreferencesStore } from './preferences'

describe('preferences store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('loads default preferences', () => {
    const store = usePreferencesStore()
    expect(store.value.pageSize).toBe(5)
    expect(store.value.compact).toBe(false)
  })

  it('updates preferences and persists them', () => {
    const store = usePreferencesStore()
    store.update({ pageSize: 3, compact: true })
    expect(store.value.pageSize).toBe(3)
    expect(store.value.compact).toBe(true)
  })
})
