<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import type { Task, TaskDraft } from '../types'
import { useWorkspaceStore } from '../stores/workspace'
import { usePreferencesStore } from '../stores/preferences'
import { useTaskList } from '../composables/useTaskList'
import { summarizeTasks } from '../utils/metrics'
import TaskTable from '../components/TaskTable.vue'
import TaskEditor from '../components/TaskEditor.vue'
const route = useRoute()
const workspace = useWorkspaceStore()
const preferences = usePreferencesStore()
const project = computed(() => workspace.projects.find(value => value.id === route.params.id))
const tasks = computed(() => workspace.forProject(String(route.params.id)))
const stats = computed(() => summarizeTasks(tasks.value))
const { search, status, priority, sort, page, filtered, pageCount, visible } = useTaskList(tasks)
const editorOpen = ref(false)
const selected = ref<Task>()
function edit(task?: Task) { selected.value = task; editorOpen.value = true }
function save(draft: TaskDraft) { workspace.saveTask(draft); editorOpen.value = false }
</script>
<template>
  <section v-if="project" class="page"><RouterLink to="/projects" class="breadcrumb">← Proyectos</RouterLink><div class="page-heading"><div><p class="eyebrow">{{ project.client }}</p><h1>{{ project.name }}</h1><p>{{ project.description }}</p></div><button @click="edit()">+ Nueva tarea</button></div>
    <div class="project-summary"><span><b>{{ stats.progress }}%</b> completadas / no canceladas</span><span><b>{{ stats.hours }} h</b> estimadas</span><span><b>{{ stats.overdue }}</b> vencidas</span></div>
    <div class="filters"><label>Buscar tareas<input v-model="search" placeholder="Título o responsable"></label><label>Estado<select v-model="status"><option value="">Todos</option><option value="active">Pendientes + en curso</option><option value="todo">Pendiente</option><option value="doing">En curso</option><option value="done">Completada</option><option value="cancelled">Cancelada</option></select></label><label>Prioridad<select v-model="priority"><option value="">Todas</option><option value="high">Alta</option><option value="medium">Media</option><option value="low">Baja</option></select></label><label>Ordenar<select v-model="sort"><option value="title">Título A–Z</option><option value="estimate">Horas: menor a mayor</option><option value="dueDate">Fecha límite</option></select></label></div>
    <TaskTable :tasks="visible" :compact="preferences.value.compact" @edit="edit" />
    <footer class="pagination"><span>{{ filtered.length }} resultados</span><div><button class="secondary" :disabled="page <= 1" @click="page--">Anterior</button><span>Página {{ page }} de {{ pageCount }}</span><button class="secondary" :disabled="page >= pageCount" @click="page++">Siguiente</button></div></footer>
    <TaskEditor v-if="editorOpen" :project-id="project.id" :task="selected" @cancel="editorOpen = false" @save="save" />
  </section><section v-else class="page"><h1>Proyecto no encontrado</h1><RouterLink to="/projects">Volver a proyectos</RouterLink></section>
</template>
