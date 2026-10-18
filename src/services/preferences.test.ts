import { describe, it, expect, beforeEach } from 'vitest'
import { loadPreferences, savePreferences, defaultPreferences, PREFERENCES_KEY } from './preferences'

describe('preferences', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads default preferences when localStorage is empty', () => {
    expect(loadPreferences()).toEqual(defaultPreferences)
  })

  it('falls back to defaults when localStorage contains invalid JSON', () => {
    localStorage.setItem(PREFERENCES_KEY, 'not-json')
    expect(loadPreferences()).toEqual(defaultPreferences)
  })

  it('persists and reloads pageSize and compact', () => {
    savePreferences({ showCompleted: true, pageSize: 10, compact: true })
    const loaded = loadPreferences()
    expect(loaded.pageSize).toBe(10)
    expect(loaded.compact).toBe(true)
  })
})
