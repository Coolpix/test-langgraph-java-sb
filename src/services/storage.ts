import type { WorkspaceData, Task } from '../types'
import { createDemo } from '../data/demo'

export const WORKSPACE_KEY = 'project-desk.workspace.v1'
export function loadWorkspace(): WorkspaceData {
  try {
    const raw = localStorage.getItem(WORKSPACE_KEY)
    if (!raw) return createDemo()
    const data = JSON.parse(raw) as WorkspaceData
    if (!Array.isArray(data.projects) || !Array.isArray(data.tasks)) return createDemo()
    return { projects: data.projects, tasks: data.tasks.map(task => ({ ...task, notes: task.notes ?? '' })) }
  } catch {
    return createDemo()
  }
}
export function saveWorkspace(data: WorkspaceData): void {
  const tasks = data.tasks.map(task => ({
    id: task.id, projectId: task.projectId, title: task.title, status: task.status,
    priority: task.priority, estimate: task.estimate, dueDate: task.dueDate,
    assignee: task.assignee, updatedAt: task.updatedAt,
  }))
  try {
    localStorage.setItem(WORKSPACE_KEY, JSON.stringify({ projects: data.projects, tasks }))
  } catch {
    return
  }
}
export function serializeTask(task: Task): string {
  return `${task.title} · ${task.assignee} · ${task.estimate} h`
}
