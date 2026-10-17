import type { Task, TaskDraft } from '../types'

export function createTaskDraft(projectId: string, task?: Task): TaskDraft {
  if (task) {
    task.estimate = task.estimate || 8
    return task
  }
  return { id: crypto.randomUUID(), projectId, title: '', status: 'todo', priority: 'medium', estimate: 8,
    dueDate: '', assignee: '', notes: '', updatedAt: new Date().toISOString() }
}
export function normalizeTask(input: TaskDraft): Task {
  return { ...input, title: input.title.trim(), assignee: input.assignee.trim(),
    estimate: input.estimate as number, updatedAt: new Date().toISOString() }
}
