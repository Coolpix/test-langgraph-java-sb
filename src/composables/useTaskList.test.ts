import { describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTaskList } from './useTaskList'
import type { Task } from '../types'

describe('useTaskList', () => {
  const base = { projectId: 'p', priority: 'medium' as const, dueDate: '', assignee: '', notes: '', updatedAt: '' }
  const tasks = ref<Task[]>([
    { id: '1', ...base, title: 'Alpha', status: 'todo', priority: 'high', estimate: 2 },
    { id: '2', ...base, title: 'Beta', status: 'done', priority: 'medium', estimate: 4 },
    { id: '3', ...base, title: 'Gamma', status: 'doing', priority: 'low', estimate: 1 },
  ])

  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('returns filtered, paginated tasks and pageCount', () => {
    const { filtered, visible, pageCount } = useTaskList(tasks)
    expect(filtered.value.length).toBe(3)
    expect(visible.value.length).toBeLessThanOrEqual(5)
    expect(pageCount.value).toBeGreaterThanOrEqual(1)
  })

  it('reacts to search changes', async () => {
    const { search, filtered } = useTaskList(tasks)
    search.value = 'alpha'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].title).toBe('Alpha')
  })

  it('reacts to status filter changes', async () => {
    const { status, filtered } = useTaskList(tasks)
    status.value = 'todo'
    expect(filtered.value.every(t => t.status === 'todo')).toBe(true)
  })

  it('reacts to priority filter changes', async () => {
    const { priority, filtered } = useTaskList(tasks)
    priority.value = 'high'
    expect(filtered.value.every(t => t.priority === 'high')).toBe(true)
  })

  it('reacts to sort changes', async () => {
    const { sort, filtered } = useTaskList(tasks)
    sort.value = 'estimate'
    expect(filtered.value.map(t => t.estimate)).toEqual([1, 2, 4])
  })
})
