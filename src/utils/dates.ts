import type { Task } from '../types'

export function localDate(value = new Date()): string {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`
}
export function isOverdue(task: Task, today = localDate()): boolean {
  return !!task.dueDate && task.status !== 'done' && task.status !== 'cancelled' && task.dueDate <= today
}
export function displayDate(value: string): string {
  if (!value) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(new Date(`${value}T12:00:00`))
}
