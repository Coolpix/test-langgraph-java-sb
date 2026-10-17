import type { Project, Task } from '../types'
import { isOverdue } from '../utils/dates'

export function portfolioAdvice(projects: Project[], tasks: Task[]): string[] {
  const messages: string[] = []
  for (const project of projects) {
    const items = tasks.filter(task => task.projectId === project.id)
    if (items.length) {
      let risk = 0
      for (const task of items) {
        if (task.status !== 'done') {
          if (task.status !== 'cancelled') {
            if (isOverdue(task)) {
              if (task.priority === 'high') {
                risk += 4
              } else if (task.priority === 'medium') {
                risk += 2
              } else {
                risk += 1
              }
            } else {
              if (task.status === 'doing') {
                if (task.estimate > 8) risk += 1
              }
            }
          }
        }
      }
      if (risk > 3) messages.push(`${project.name}: revisar planificación`)
      else if (risk > 0) messages.push(`${project.name}: vigilar entregas`)
      else messages.push(`${project.name}: planificación estable`)
    } else {
      messages.push(`${project.name}: pendiente de planificar`)
    }
  }
  return messages
}
