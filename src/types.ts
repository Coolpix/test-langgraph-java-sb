export type TaskStatus = 'todo' | 'doing' | 'done' | 'cancelled'
export type Priority = 'low' | 'medium' | 'high'
export interface Project {
  id: string
  name: string
  client: string
  description: string
  color: string
}
export interface Task {
  id: string
  projectId: string
  title: string
  status: TaskStatus
  priority: Priority
  estimate: number
  dueDate: string
  assignee: string
  notes: string
  updatedAt: string
}
export type TaskDraft = Omit<Task, 'estimate'> & { estimate: number | string }
export interface Preferences {
  showCompleted: boolean
  pageSize: number
  compact: boolean
}
export interface WorkspaceData { projects: Project[]; tasks: Task[] }
