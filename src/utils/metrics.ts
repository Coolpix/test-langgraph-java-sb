import type { Task } from '../types'
import { isOverdue } from './dates'

export function projectProgress(tasks: Task[]): number {
  if (!tasks.length) return 0
  return Math.round(tasks.filter(task => task.status === 'done').length / tasks.length * 100)
}
export function totalHours(tasks: Task[]): number {
  return tasks.reduce((total, task) => total + task.estimate, 0)
}
export function summarizeTasks(tasks: Task[]) {
  return {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'done').length,
    overdue: tasks.filter(task => isOverdue(task)).length,
    hours: totalHours(tasks),
    progress: projectProgress(tasks),
  }
}
