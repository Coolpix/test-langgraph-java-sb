import { describe, it, expect } from 'vitest'
import { localDate, isOverdue, displayDate } from './dates'
import type { Task } from '../types'

describe('dates', () => {
  it('localDate formats a date as YYYY-MM-DD', () => {
    expect(localDate(new Date('2025-03-15T00:00:00'))).toBe('2025-03-15')
  })

  it('isOverdue returns true for pending tasks with a past due date', () => {
    const task = { status: 'todo', dueDate: '2024-01-01' } as Task
    expect(isOverdue(task, '2025-01-01')).toBe(true)
  })

  it('isOverdue returns false for completed or cancelled tasks', () => {
    const done = { status: 'done', dueDate: '2024-01-01' } as Task
    const cancelled = { status: 'cancelled', dueDate: '2024-01-01' } as Task
    expect(isOverdue(done, '2025-01-01')).toBe(false)
    expect(isOverdue(cancelled, '2025-01-01')).toBe(false)
  })

  it('isOverdue returns false when due date is in the future', () => {
    const task = { status: 'todo', dueDate: '2025-12-31' } as Task
    expect(isOverdue(task, '2025-01-01')).toBe(false)
  })

  it('displayDate returns Sin fecha for empty values', () => {
    expect(displayDate('')).toBe('Sin fecha')
  })

  it('displayDate formats a date in Spanish', () => {
    expect(displayDate('2025-03-15')).toContain('mar')
  })
})
