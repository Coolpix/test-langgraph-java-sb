import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'
import ProjectsView from './views/ProjectsView.vue'
import ProjectView from './views/ProjectView.vue'
import PreferencesView from './views/PreferencesView.vue'
import NotFoundView from './views/NotFoundView.vue'

export const router = createRouter({ history: createWebHistory(), routes: [
  { path: '/', component: DashboardView },
  { path: '/projects', component: ProjectsView },
  { path: '/projects/:id', component: ProjectView },
  { path: '/preferences', component: PreferencesView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
] })
