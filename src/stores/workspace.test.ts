import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useWorkspaceStore } from './workspace'
import type { TaskDraft } from '../types'

describe('workspace store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('loads demo workspace', () => {
    const store = useWorkspaceStore()
    expect(store.projects.length).toBeGreaterThan(0)
    expect(store.summary.total).toBeGreaterThan(0)
  })

  it('filters tasks by project', () => {
    const store = useWorkspaceStore()
    expect(store.forProject('atlas').length).toBeGreaterThan(0)
    expect(store.forProject('unknown')).toHaveLength(0)
  })

  it('adds a new task', () => {
    const store = useWorkspaceStore()
    const initial = store.tasks.length
    const draft: TaskDraft = {
      id: 'new', projectId: 'atlas', title: 'New task', status: 'todo', priority: 'medium',
      estimate: 2, dueDate: '', assignee: '', notes: '', updatedAt: '',
    }
    store.saveTask(draft)
    expect(store.tasks.length).toBe(initial + 1)
    expect(store.tasks.at(-1)?.title).toBe('New task')
  })

  it('updates an existing task', () => {
    const store = useWorkspaceStore()
    const task = store.tasks[0]
    const draft: TaskDraft = { ...task, title: 'Updated title' }
    store.saveTask(draft)
    expect(store.tasks.find(t => t.id === task.id)?.title).toBe('Updated title')
  })
})
