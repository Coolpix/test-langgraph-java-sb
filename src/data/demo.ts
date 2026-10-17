import type { WorkspaceData, Task } from '../types'
import { localDate } from '../utils/dates'

export function createDemo(): WorkspaceData {
  const now = new Date()
  const date = (days: number) => {
    const value = new Date(now)
    value.setDate(value.getDate() + days)
    return localDate(value)
  }
  const task = (id: string, title: string, status: Task['status'], estimate: number, due: number, priority: Task['priority'] = 'medium'): Task => ({
    id, projectId: 'atlas', title, status, estimate, dueDate: date(due), priority,
    assignee: 'Marta Sol', notes: '', updatedAt: now.toISOString(),
  })
  return {
    projects: [
      { id: 'atlas', name: 'Portal Atlas', client: 'Estudio Bruma', description: 'Una nueva experiencia para el catálogo de talleres del estudio.', color: '#467968' },
      { id: 'lumen', name: 'Lumen móvil', client: 'Colectivo Lumen', description: 'Planificación del lanzamiento de la aplicación de lectura.', color: '#a77140' },
      { id: 'orbit', name: 'Órbita interna', client: 'Equipo interno', description: 'Herramientas para organizar nuestro trabajo diario.', color: '#7563a5' },
    ],
    tasks: [
      task('a1', 'Diseñar navegación', 'done', 2, -3),
      task('a2', 'Validar prototipo', 'cancelled', 4, -2),
      task('a3', 'Conectar catálogo', 'doing', 10, 0, 'high'),
      task('a4', 'Revisar accesibilidad', 'todo', 3, 2, 'high'),
      task('a5', 'Preparar imágenes', 'todo', 12, 4, 'low'),
      task('a6', 'Reunión de seguimiento', 'todo', 0, 1),
      task('a7', 'Publicar catálogo', 'todo', 1, 6),
      { ...task('l1', 'Definir campaña', 'doing', 6, -1, 'high'), projectId: 'lumen', assignee: 'Nico Prado' },
      { ...task('l2', 'Revisar textos', 'done', 2, 2), projectId: 'lumen' },
      { ...task('o1', 'Preparar agenda', 'todo', 1, 7, 'low'), projectId: 'orbit' },
    ],
  }
}
