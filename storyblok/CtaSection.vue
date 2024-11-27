<template>
    <section 
      v-editable="blok" 
      class="py-16 bg-gradient-to-r from-blue-600 to-blue-700 my-6 rounded-[5px]"
    >
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-white mb-4">{{ blok.title }}</h2>
        <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {{ blok.description }}
        </p>
        <NuxtLink 
          v-if="blok.button_link && blok.button_text"
          :to="blok.button_link.cached_url"
          class="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
        >
          {{ blok.button_text }}
        </NuxtLink>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({
    blok: {
      type: Object,
      required: true
    }
  })
  </script>