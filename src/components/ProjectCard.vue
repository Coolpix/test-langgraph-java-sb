<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Project, Task } from '../types'
import { summarizeTasks } from '../utils/metrics'
const props = defineProps<{ project: Project; tasks: Task[] }>()
const stats = computed(() => summarizeTasks(props.tasks))
</script>
<template>
  <RouterLink :to="`/projects/${project.id}`" class="project-card">
    <div class="card-top"><span class="project-symbol" :style="{ background: project.color }">{{ project.name.slice(0, 1) }}</span><span class="pill">{{ project.client }}</span></div>
    <h3>{{ project.name }}</h3><p>{{ project.description }}</p>
    <div class="progress-label"><span>Completadas / no canceladas</span><b>{{ stats.progress }}%</b></div>
    <progress :value="stats.progress" max="100" :aria-label="`Progreso de ${project.name}`"></progress>
    <footer><span>{{ stats.total }} tareas</span><span>{{ stats.hours }} h estimadas →</span></footer>
  </RouterLink>
</template>
