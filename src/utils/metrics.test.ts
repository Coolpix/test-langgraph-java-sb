import { describe, it, expect } from 'vitest'
import { projectProgress, totalHours, summarizeTasks } from './metrics'
import type { Task } from '../types'

describe('metrics', () => {
  const base = { projectId: 'p', priority: 'medium' as const, dueDate: '', assignee: '', notes: '', updatedAt: '' }

  it('projectProgress returns 0 for empty task list', () => {
    expect(projectProgress([])).toBe(0)
  })

  it('projectProgress calculates percentage of done tasks', () => {
    const tasks: Task[] = [
      { id: '1', ...base, title: 'A', status: 'done', estimate: 2 },
      { id: '2', ...base, title: 'B', status: 'todo', estimate: 4 },
      { id: '3', ...base, title: 'C', status: 'done', estimate: 6 },
    ]
    expect(projectProgress(tasks)).toBe(67)
  })

  it('totalHours sums estimates', () => {
    const tasks: Task[] = [
      { id: '1', ...base, title: 'A', status: 'todo', estimate: 2 },
      { id: '2', ...base, title: 'B', status: 'doing', estimate: 3 },
    ]
    expect(totalHours(tasks)).toBe(5)
  })

  it('summarizeTasks aggregates counts and hours', () => {
    const tasks: Task[] = [
      { id: '1', ...base, title: 'A', status: 'done', estimate: 2 },
      { id: '2', ...base, title: 'B', status: 'todo', estimate: 4, dueDate: '2000-01-01' },
    ]
    const summary = summarizeTasks(tasks)
    expect(summary).toEqual({ total: 2, completed: 1, overdue: 1, hours: 6, progress: 50 })
  })
})
