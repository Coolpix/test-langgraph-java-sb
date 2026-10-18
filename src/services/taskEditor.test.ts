import { describe, it, expect } from 'vitest'
import { createTaskDraft, normalizeTask } from './taskEditor'
import type { Task } from '../types'

describe('taskEditor', () => {
  it('creates a draft for a new task', () => {
    const draft = createTaskDraft('p1')
    expect(draft.projectId).toBe('p1')
    expect(draft.title).toBe('')
    expect(draft.status).toBe('todo')
    expect(draft.estimate).toBe(8)
    expect(draft.id).toBeTypeOf('string')
  })

  it('reuses an existing task as draft', () => {
    const task: Task = {
      id: 't1', projectId: 'p1', title: 'Title', status: 'doing', priority: 'high',
      estimate: 3, dueDate: '2025-01-01', assignee: 'Ana', notes: '', updatedAt: '2024-01-01T00:00:00.000Z',
    }
    const draft = createTaskDraft('p1', task)
    expect(draft.title).toBe('Title')
    expect(draft.status).toBe('doing')
  })

  it('normalizes title and assignee trimming whitespace', () => {
    const draft = createTaskDraft('p1')
    draft.title = '  Title  '
    draft.assignee = '  Ana  '
    draft.updatedAt = '2020-01-01T00:00:00.000Z'
    const task = normalizeTask(draft)
    expect(task.title).toBe('Title')
    expect(task.assignee).toBe('Ana')
    expect(task.updatedAt).not.toBe(draft.updatedAt)
  })
})
