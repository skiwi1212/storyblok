<script setup>
defineProps({
  blok: {
    type: Object,
    default: () => ({})
  }
})

defineOptions({
  name: 'menu_link'
})
</script>

<template>
  <NuxtLink 
    v-if="blok.link && blok.link.cached_url"
    :to="blok.link.cached_url"
    class="text-gray-300 hover:text-white transition-colors duration-200"
  >
    {{ blok.text }}
  </NuxtLink>
</template>