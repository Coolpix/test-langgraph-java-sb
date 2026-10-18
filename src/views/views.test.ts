import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './DashboardView.vue'
import ProjectsView from './ProjectsView.vue'
import ProjectView from './ProjectView.vue'
import PreferencesView from './PreferencesView.vue'
import NotFoundView from './NotFoundView.vue'

function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: DashboardView },
      { path: '/projects', component: ProjectsView },
      { path: '/projects/:id', component: ProjectView },
      { path: '/preferences', component: PreferencesView },
      { path: '/:pathMatch(.*)*', component: NotFoundView },
    ],
  })
}

describe('views', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('DashboardView renders dashboard', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(DashboardView, { global: { plugins: [createPinia(), router] } })
    await flushPromises()
    expect(wrapper.text()).toContain('Tu trabajo')
    expect(wrapper.text()).toContain('Proyectos en marcha')
  })

  it('ProjectsView renders projects and filters by search', async () => {
    const router = createTestRouter()
    await router.push('/projects')
    await router.isReady()
    const wrapper = mount(ProjectsView, { global: { plugins: [createPinia(), router] } })
    await flushPromises()
    expect(wrapper.text()).toContain('Proyectos')
    expect(wrapper.text()).toContain('Portal Atlas')
  })

  it('ProjectView renders project details', async () => {
    const router = createTestRouter()
    await router.push('/projects/atlas')
    await router.isReady()
    const wrapper = mount(ProjectView, { global: { plugins: [createPinia(), router] } })
    await flushPromises()
    expect(wrapper.text()).toContain('Portal Atlas')
    expect(wrapper.text()).toContain('Estudio Bruma')
  })

  it('ProjectView opens task editor', async () => {
    const router = createTestRouter()
    await router.push('/projects/atlas')
    await router.isReady()
    const wrapper = mount(ProjectView, { global: { plugins: [createPinia(), router] } })
    await flushPromises()
    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('Nueva tarea')
  })

  it('ProjectView shows not found for unknown project', async () => {
    const router = createTestRouter()
    await router.push('/projects/unknown')
    await router.isReady()
    const wrapper = mount(ProjectView, { global: { plugins: [createPinia(), router] } })
    await flushPromises()
    expect(wrapper.text()).toContain('Proyecto no encontrado')
  })

  it('PreferencesView renders controls', async () => {
    const wrapper = mount(PreferencesView, { global: { plugins: [createPinia()] } })
    await flushPromises()
    expect(wrapper.text()).toContain('Preferencias')
    expect(wrapper.text()).toContain('Mostrar tareas completadas')
  })

  it('NotFoundView renders message', async () => {
    const router = createTestRouter()
    await router.push('/missing')
    await router.isReady()
    const wrapper = mount(NotFoundView, { global: { plugins: [router] } })
    await flushPromises()
    expect(wrapper.text()).toContain('No encontramos esta página')
  })
})
