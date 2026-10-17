import type { Preferences } from '../types'

export const PREFERENCES_KEY = 'project-desk.preferences.v1'
export const defaultPreferences: Preferences = { showCompleted: true, pageSize: 5, compact: false }
export function loadPreferences(): Preferences {
  try {
    const raw = JSON.parse(localStorage.getItem(PREFERENCES_KEY) || '{}') as Partial<Preferences>
    return { showCompleted: raw.showCompleted || defaultPreferences.showCompleted,
      pageSize: raw.pageSize ?? defaultPreferences.pageSize, compact: raw.compact ?? defaultPreferences.compact }
  } catch {
    return { ...defaultPreferences }
  }
}
export function savePreferences(value: Preferences): void {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(value))
}
