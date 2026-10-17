<script setup lang="ts">
import type { Task } from '../types'
import { isOverdue, displayDate } from '../utils/dates'
defineProps<{ tasks: Task[]; compact: boolean }>()
const emit = defineEmits<{ edit: [task: Task] }>()
const statuses = { todo: 'Pendiente', doing: 'En curso', done: 'Completada', cancelled: 'Cancelada' }
const priorities = { low: 'Baja', medium: 'Media', high: 'Alta' }
</script>
<template>
  <div class="table-scroll"><table :class="{ compact }"><thead><tr><th>Tarea</th><th>Estado</th><th>Prioridad</th><th>Horas</th><th>Fecha límite</th><th><span class="sr-only">Acciones</span></th></tr></thead>
    <tbody><tr v-for="task in tasks" :key="task.id"><td><strong>{{ task.title }}</strong><small>{{ task.assignee || 'Sin asignar' }}</small></td>
      <td><span class="pill" :class="task.status">{{ statuses[task.status] }}</span></td><td>{{ priorities[task.priority] }}</td><td>{{ task.estimate }} h</td>
      <td :class="{ overdue: isOverdue(task) }">{{ displayDate(task.dueDate) }}<small v-if="isOverdue(task)">Vencida</small></td>
      <td><button class="text-button" :aria-label="`Editar ${task.title}`" @click="emit('edit', task)">Editar</button></td></tr></tbody>
  </table><p v-if="!tasks.length" class="empty">No hay tareas para mostrar.</p></div>
</template>
