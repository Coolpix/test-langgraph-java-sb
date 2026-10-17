import { computed, ref, type Ref } from 'vue'
import type { Task } from '../types'
import { filterTasks, sortTasks, paginate, type TaskQuery } from '../utils/taskQuery'
import { usePreferencesStore } from '../stores/preferences'

export function useTaskList(tasks: Ref<Task[]>) {
  const preferences = usePreferencesStore()
  const search = ref('')
  const status = ref('')
  const priority = ref<TaskQuery['priority']>('')
  const sort = ref<TaskQuery['sort']>('title')
  const page = ref(1)
  const filtered = computed(() => sortTasks(filterTasks(tasks.value, {
    search: search.value, status: status.value, priority: priority.value,
    sort: sort.value, showCompleted: preferences.value.showCompleted,
  }), sort.value))
  const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / preferences.value.pageSize)))
  const visible = computed(() => paginate(filtered.value, page.value, preferences.value.pageSize))
  return { search, status, priority, sort, page, filtered, pageCount, visible }
}
