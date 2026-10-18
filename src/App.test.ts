import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

describe('App', () => {
  it('renders the app shell with navigation', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: { template: '<div data-testid="home">home</div>' } }],
    })
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: { plugins: [createPinia(), router] },
    })
    await flushPromises()

    expect(wrapper.text()).toContain('Project Desk')
    expect(wrapper.text()).toContain('Resumen')
    expect(wrapper.text()).toContain('Proyectos')
    expect(wrapper.text()).toContain('Preferencias')
    expect(wrapper.text()).toContain('Mi espacio de trabajo')
  })
})
