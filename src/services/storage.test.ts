import { describe, it, expect, beforeEach } from 'vitest'
import { loadWorkspace, saveWorkspace, serializeTask, WORKSPACE_KEY } from './storage'
import type { WorkspaceData, Task } from '../types'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads demo workspace when localStorage is empty', () => {
    const data = loadWorkspace()
    expect(data.projects.length).toBeGreaterThan(0)
    expect(data.tasks.length).toBeGreaterThan(0)
  })

  it('falls back to demo workspace when JSON is invalid', () => {
    localStorage.setItem(WORKSPACE_KEY, 'not-json')
    const data = loadWorkspace()
    expect(data.projects.length).toBeGreaterThan(0)
  })

  it('falls back to demo workspace when data shape is wrong', () => {
    localStorage.setItem(WORKSPACE_KEY, JSON.stringify({ projects: null, tasks: [] }))
    const data = loadWorkspace()
    expect(data.projects.length).toBeGreaterThan(0)
  })

  it('saves and reloads workspace', () => {
    const data: WorkspaceData = {
      projects: [{ id: 'p1', name: 'P', client: 'C', description: '', color: '' }],
      tasks: [{ id: 't1', projectId: 'p1', title: 'T', status: 'todo', priority: 'medium', estimate: 1, dueDate: '', assignee: '', notes: '', updatedAt: '' }],
    }
    saveWorkspace(data)
    const loaded = loadWorkspace()
    expect(loaded.projects).toEqual(data.projects)
    expect(loaded.tasks).toHaveLength(1)
  })

  it('serializes a task', () => {
    const task = { title: 'T', assignee: 'A', estimate: 5 } as Task
    expect(serializeTask(task)).toBe('T · A · 5 h')
  })
})
