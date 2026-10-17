<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Task, TaskDraft } from '../types'
import { createTaskDraft } from '../services/taskEditor'
const props = defineProps<{ projectId: string; task?: Task }>()
const emit = defineEmits<{ save: [draft: TaskDraft]; cancel: [] }>()
const draft = reactive(createTaskDraft(props.projectId, props.task))
const error = ref('')
function submit() {
  if (!draft.title.trim()) { error.value = 'Escribe un título para la tarea.'; return }
  if (!Number.isFinite(Number(draft.estimate)) || Number(draft.estimate) < 0) { error.value = 'Las horas deben ser un número mayor o igual que cero.'; return }
  emit('save', draft)
}
</script>
<template>
  <div class="overlay"><section class="editor" role="dialog" aria-modal="true" aria-labelledby="editor-title">
    <h2 id="editor-title">{{ task ? 'Editar tarea' : 'Nueva tarea' }}</h2>
    <form @submit.prevent="submit">
      <label>Título<input v-model="draft.title" autofocus required maxlength="120"></label>
      <div class="form-grid"><label>Estado<select v-model="draft.status"><option value="todo">Pendiente</option><option value="doing">En curso</option><option value="done">Completada</option><option value="cancelled">Cancelada</option></select></label>
      <label>Prioridad<select v-model="draft.priority"><option value="low">Baja</option><option value="medium">Media</option><option value="high">Alta</option></select></label>
      <label>Horas estimadas<input v-model="draft.estimate" inputmode="decimal" required></label>
      <label>Fecha límite<input v-model="draft.dueDate" type="date"></label></div>
      <label>Responsable<input v-model="draft.assignee" maxlength="80"></label>
      <label>Notas<textarea v-model="draft.notes" rows="3" maxlength="2000"></textarea></label>
      <p v-if="error" role="alert" class="error">{{ error }}</p>
      <footer class="actions"><button type="button" class="secondary" @click="emit('cancel')">Cancelar</button><button type="submit">Guardar tarea</button></footer>
    </form>
  </section></div>
</template>
