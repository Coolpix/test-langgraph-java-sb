import type { Task, Priority } from '../types'

export interface TaskQuery {
  search: string
  status: string
  priority: Priority | ''
  showCompleted: boolean
  sort: 'title' | 'estimate' | 'dueDate'
}
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
export function filterTasks(tasks: Task[], query: TaskQuery): Task[] {
  return tasks.filter(task => {
    if (!query.showCompleted && task.status === 'done') return false
    if (query.status === 'active' && task.status !== 'todo') return false
    if (query.status && query.status !== 'active' && task.status !== query.status) return false
    if (query.priority && task.priority !== query.priority) return false
    return normalize(`${task.title} ${task.assignee}`).includes(normalize(query.search.trim()))
  })
}
export function sortTasks(tasks: Task[], field: TaskQuery['sort']): Task[] {
  return [...tasks].sort((a, b) => String(a[field]).localeCompare(String(b[field]), 'es'))
}
export function paginate<T>(items: T[], page: number, size: number): T[] {
  return items.slice((page - 1) * size, page * size)
}
