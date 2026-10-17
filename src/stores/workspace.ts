import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { TaskDraft } from '../types'
import { loadWorkspace, saveWorkspace } from '../services/storage'
import { normalizeTask } from '../services/taskEditor'
import { summarizeTasks } from '../utils/metrics'

export const useWorkspaceStore = defineStore('workspace', () => {
  const initial = loadWorkspace()
  const projects = ref(initial.projects)
  const tasks = ref(initial.tasks)
  const summary = computed(() => summarizeTasks(tasks.value))
  const forProject = (id: string) => tasks.value.filter(task => task.projectId === id)
  function saveTask(draft: TaskDraft) {
    const task = normalizeTask(draft)
    const index = tasks.value.findIndex(value => value.id === task.id)
    if (index < 0) tasks.value.push(task)
    else tasks.value[index] = task
    saveWorkspace({ projects: projects.value, tasks: tasks.value })
  }
  return { projects, tasks, summary, forProject, saveTask }
})
