import { describe, it, expect } from 'vitest'
import { portfolioAdvice } from './portfolio'
import type { Project, Task } from '../types'

describe('portfolio', () => {
  const projects: Project[] = [
    { id: 'p1', name: 'Atlas', client: 'C1', description: 'D1', color: '#000' },
    { id: 'p2', name: 'Lumen', client: 'C2', description: 'D2', color: '#fff' },
  ]
  const base = { projectId: 'p1', priority: 'medium' as const, dueDate: '', assignee: '', notes: '', updatedAt: '' }

  it('advises to plan a project without tasks', () => {
    expect(portfolioAdvice(projects, [])).toContain('Atlas: pendiente de planificar')
  })

  it('advises stable planning when risk is zero', () => {
    const tasks: Task[] = [
      { id: '1', ...base, title: 'T', status: 'done', estimate: 2 },
    ]
    expect(portfolioAdvice(projects, tasks)).toContain('Atlas: planificación estable')
  })

  it('advises to watch deliveries for low risk', () => {
    const tasks: Task[] = [
      { id: '1', ...base, title: 'T', status: 'doing', estimate: 10, priority: 'medium' },
    ]
    expect(portfolioAdvice(projects, tasks)).toContain('Atlas: vigilar entregas')
  })

  it('advises to review planning for high risk', () => {
    const tasks: Task[] = [
      { id: '1', ...base, title: 'T1', status: 'todo', estimate: 2, priority: 'high', dueDate: '2000-01-01' },
      { id: '2', ...base, title: 'T2', status: 'todo', estimate: 2, priority: 'high', dueDate: '2000-01-01' },
    ]
    expect(portfolioAdvice(projects, tasks)).toContain('Atlas: revisar planificación')
  })
})
