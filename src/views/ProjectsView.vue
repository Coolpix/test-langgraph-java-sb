<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { useWorkspaceStore } from '../stores/workspace'
const workspace = useWorkspaceStore()
const search = ref('')
const projects = computed(() => workspace.projects.filter(project => `${project.name} ${project.client}`.toLocaleLowerCase('es').includes(search.value.toLocaleLowerCase('es'))))
</script>
<template><section class="page"><p class="eyebrow">TU CARTERA</p><h1>Proyectos</h1><p>Personas, entregas y tareas conectadas.</p><label class="search-label">Buscar proyectos<input v-model="search" placeholder="Nombre o cliente"></label><div class="project-grid"><ProjectCard v-for="project in projects" :key="project.id" :project="project" :tasks="workspace.forProject(project.id)" /></div><p v-if="!projects.length" class="empty">No se han encontrado proyectos.</p></section></template>
