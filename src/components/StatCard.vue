<script setup lang="ts">
defineProps<{ label: string; value: string | number; detail: string }>()
</script>
<template><article class="stat-card"><span>{{ label }}</span><strong>{{ value }}</strong><small>{{ detail }}</small></article></template>
