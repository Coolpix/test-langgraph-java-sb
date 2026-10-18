import { describe, it, expect } from 'vitest'
import { filterTasks, sortTasks, paginate } from './taskQuery'
import type { Task } from '../types'

describe('taskQuery', () => {
  const base = { projectId: 'p', priority: 'medium' as const, dueDate: '', assignee: '', notes: '', updatedAt: '' }
  const tasks: Task[] = [
    { id: '1', ...base, title: 'Alpha', status: 'todo', priority: 'high', estimate: 2, assignee: 'Ana' },
    { id: '2', ...base, title: 'Beta', status: 'done', priority: 'medium', estimate: 4, assignee: 'Luis' },
    { id: '3', ...base, title: 'Gamma', status: 'doing', priority: 'low', estimate: 1, assignee: 'Ana' },
  ]

  it('filters by exact status', () => {
    const result = filterTasks(tasks, { search: '', status: 'todo', priority: '', showCompleted: true, sort: 'title' })
    expect(result.map(t => t.title)).toEqual(['Alpha'])
  })

  it('hides completed tasks when showCompleted is false', () => {
    const result = filterTasks(tasks, { search: '', status: '', priority: '', showCompleted: false, sort: 'title' })
    expect(result.some(t => t.status === 'done')).toBe(false)
    expect(result).toHaveLength(2)
  })

  it('filters by priority', () => {
    const result = filterTasks(tasks, { search: '', status: '', priority: 'high', showCompleted: true, sort: 'title' })
    expect(result.map(t => t.title)).toEqual(['Alpha'])
  })

  it('searches normalized title and assignee', () => {
    const result = filterTasks(tasks, { search: 'luis', status: '', priority: '', showCompleted: true, sort: 'title' })
    expect(result.map(t => t.title)).toEqual(['Beta'])
  })

  it('sorts tasks by title', () => {
    const result = sortTasks(tasks, 'title')
    expect(result.map(t => t.title)).toEqual(['Alpha', 'Beta', 'Gamma'])
  })

  it('sorts tasks by estimate', () => {
    const result = sortTasks(tasks, 'estimate')
    expect(result.map(t => t.estimate)).toEqual([1, 2, 4])
  })

  it('paginates a list', () => {
    const result = paginate(tasks, 1, 2)
    expect(result).toHaveLength(2)
    expect(paginate(tasks, 2, 2)).toHaveLength(1)
  })
})
