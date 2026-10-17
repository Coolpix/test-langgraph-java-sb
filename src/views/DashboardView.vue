<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useWorkspaceStore } from '../stores/workspace'
import { portfolioAdvice } from '../services/portfolio'
import ProjectCard from '../components/ProjectCard.vue'
import StatCard from '../components/StatCard.vue'
const workspace = useWorkspaceStore()
const advice = computed(() => portfolioAdvice(workspace.projects, workspace.tasks))
</script>
<template>
  <section class="page"><div class="page-heading"><div><p class="eyebrow">UNA VISTA DE TODO</p><h1>Tu trabajo, en perspectiva.</h1><p>Organiza lo importante y da el siguiente paso.</p></div><RouterLink to="/projects" class="button">Ver proyectos ↗</RouterLink></div>
    <div class="stats"><StatCard label="Proyectos" :value="workspace.projects.length" detail="En tu espacio de trabajo" /><StatCard label="Tareas completadas" :value="workspace.summary.completed" :detail="`De ${workspace.summary.total} tareas`" /><StatCard label="Tareas vencidas" :value="workspace.summary.overdue" detail="Fecha anterior a hoy, sin cerrar" /><StatCard label="Horas estimadas" :value="workspace.summary.hours" detail="Suma de estimaciones" /></div>
    <div class="section-heading"><h2>Proyectos en marcha</h2><RouterLink to="/projects">Todos los proyectos →</RouterLink></div>
    <div class="project-grid"><ProjectCard v-for="project in workspace.projects" :key="project.id" :project="project" :tasks="workspace.forProject(project.id)" /></div>
    <section class="insight"><div><p class="eyebrow">PULSO DEL EQUIPO</p><h2>Un momento para planificar.</h2><p>Las fechas y las prioridades ayudan a enfocar el trabajo.</p></div><ul><li v-for="message in advice" :key="message">{{ message }}</li></ul></section>
  </section>
</template>
