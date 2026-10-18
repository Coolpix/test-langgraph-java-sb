import type { Project, Task } from '../types'
import { isOverdue } from '../utils/dates'

function taskRisk(task: Task): number {
  if (task.status === 'done' || task.status === 'cancelled') return 0
  if (isOverdue(task)) {
    if (task.priority === 'high') return 4
    if (task.priority === 'medium') return 2
    return 1
  }
  if (task.status === 'doing' && task.estimate > 8) return 1
  return 0
}

export function portfolioAdvice(projects: Project[], tasks: Task[]): string[] {
  const messages: string[] = []
  for (const project of projects) {
    const items = tasks.filter(task => task.projectId === project.id)
    if (!items.length) {
      messages.push(`${project.name}: pendiente de planificar`)
      continue
    }
    let risk = 0
    for (const task of items) risk += taskRisk(task)
    if (risk > 3) messages.push(`${project.name}: revisar planificación`)
    else if (risk > 0) messages.push(`${project.name}: vigilar entregas`)
    else messages.push(`${project.name}: planificación estable`)
  }
  return messages
}
