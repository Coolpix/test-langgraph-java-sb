<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="shell">
    <aside class="sidebar">
      <RouterLink to="/" class="brand"><span class="brand-icon">P</span> Project Desk</RouterLink>
      <p class="eyebrow">ESTUDIO / ESPACIO DE TRABAJO</p>
      <nav aria-label="Principal">
        <RouterLink to="/">Resumen</RouterLink>
        <RouterLink to="/projects">Proyectos</RouterLink>
        <RouterLink to="/preferences">Preferencias</RouterLink>
      </nav>
      <div class="sidebar-footer"><span class="avatar">MS</span><div>Marta Sol<small>Equipo de producto</small></div></div>
    </aside>
    <main><header class="topbar"><span>Mi espacio de trabajo</span><span class="local-label">Datos guardados en este navegador</span></header><RouterView :key="$route.path" /></main>
  </div>
</template>
