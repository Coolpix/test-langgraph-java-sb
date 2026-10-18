import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import ProjectCard from './ProjectCard.vue'
import StatCard from './StatCard.vue'
import TaskTable from './TaskTable.vue'
import TaskEditor from './TaskEditor.vue'
import { localDate } from '../utils/dates'
import type { Task } from '../types'

async function createRouterWithRoot() {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: { template: '<div />' } }],
  })
  await router.push('/')
  await router.isReady()
  return router
}

describe('components', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('ProjectCard renders project data and stats', async () => {
    const router = await createRouterWithRoot()
    const project = { id: 'p1', name: 'Atlas', client: 'Estudio Bruma', description: 'D', color: '#467968' }
    const wrapper = mount(ProjectCard, {
      props: { project, tasks: [] },
      global: { plugins: [router] },
    })
    expect(wrapper.text()).toContain('Atlas')
    expect(wrapper.text()).toContain('Estudio Bruma')
    expect(wrapper.text()).toContain('0 tareas')
  })

  it('ProjectCard displays progress for tasks', async () => {
    const router = await createRouterWithRoot()
    const project = { id: 'p1', name: 'Atlas', client: 'C', description: 'D', color: '#000' }
    const tasks: Task[] = [
      { id: '1', projectId: 'p1', title: 'A', status: 'done', priority: 'medium', estimate: 2, dueDate: '', assignee: '', notes: '', updatedAt: '' },
      { id: '2', projectId: 'p1', title: 'B', status: 'todo', priority: 'medium', estimate: 2, dueDate: '', assignee: '', notes: '', updatedAt: '' },
    ]
    const wrapper = mount(ProjectCard, {
      props: { project, tasks },
      global: { plugins: [router] },
    })
    expect(wrapper.text()).toContain('50%')
    expect(wrapper.text()).toContain('4 h')
  })

  it('StatCard renders label, value and detail', () => {
    const wrapper = mount(StatCard, { props: { label: 'Proyectos', value: 5, detail: 'En tu espacio' } })
    expect(wrapper.text()).toContain('Proyectos')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('En tu espacio')
  })

  it('TaskTable renders tasks and emits edit on click', () => {
    const tasks: Task[] = [
      { id: '1', projectId: 'p', title: 'Tarea 1', status: 'todo', priority: 'high', estimate: 2, dueDate: '', assignee: 'Ana', notes: '', updatedAt: '' },
    ]
    const wrapper = mount(TaskTable, { props: { tasks, compact: false } })
    expect(wrapper.text()).toContain('Tarea 1')
    expect(wrapper.text()).toContain('Ana')
    wrapper.find('button.text-button').trigger('click')
    expect(wrapper.emitted('edit')).toHaveLength(1)
  })

  it('TaskTable shows empty message when tasks list is empty', () => {
    const wrapper = mount(TaskTable, { props: { tasks: [], compact: false } })
    expect(wrapper.text()).toContain('No hay tareas')
  })

  it('TaskTable marks overdue tasks', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const tasks: Task[] = [
      { id: '1', projectId: 'p', title: 'Vencida', status: 'todo', priority: 'high', estimate: 2, dueDate: localDate(yesterday), assignee: '', notes: '', updatedAt: '' },
    ]
    const wrapper = mount(TaskTable, { props: { tasks, compact: true } })
    expect(wrapper.find('td.overdue').exists()).toBe(true)
  })

  it('TaskEditor renders new task title', () => {
    const wrapper = mount(TaskEditor, { props: { projectId: 'p1' } })
    expect(wrapper.text()).toContain('Nueva tarea')
  })

  it('TaskEditor renders edit title when task is provided', () => {
    const task: Task = { id: 't1', projectId: 'p1', title: 'T', status: 'todo', priority: 'medium', estimate: 2, dueDate: '', assignee: '', notes: '', updatedAt: '' }
    const wrapper = mount(TaskEditor, { props: { projectId: 'p1', task } })
    expect(wrapper.text()).toContain('Editar tarea')
  })

  it('TaskEditor validates missing title', async () => {
    const wrapper = mount(TaskEditor, { props: { projectId: 'p1' } })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    expect(wrapper.text()).toContain('Escribe un título')
  })

  it('TaskEditor validates negative estimate', async () => {
    const wrapper = mount(TaskEditor, { props: { projectId: 'p1' } })
    await wrapper.find('input').setValue('Title')
    const estimate = wrapper.find('input[inputmode="decimal"]')
    await estimate.setValue('-1')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    expect(wrapper.text()).toContain('Las horas deben ser un número mayor o igual que cero')
  })

  it('TaskEditor emits save with valid data', async () => {
    const wrapper = mount(TaskEditor, { props: { projectId: 'p1' } })
    await wrapper.find('input').setValue('Valid title')
    const estimate = wrapper.find('input[inputmode="decimal"]')
    await estimate.setValue('5')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    expect(wrapper.emitted('save')).toHaveLength(1)
  })

  it('TaskEditor emits cancel on button click', async () => {
    const wrapper = mount(TaskEditor, { props: { projectId: 'p1' } })
    await wrapper.find('button.secondary').trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})
