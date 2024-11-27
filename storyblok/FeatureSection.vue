<template>
    <section v-editable="blok" class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4">{{ blok.title }}</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">{{ blok.description }}</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="feature in blok.features" 
          :key="feature._uid"
          class="p-6 bg-white rounded-[5px] shadow-md"
        >
          <img 
            v-if="feature.icon?.filename"
            :src="feature.icon.filename"
            :alt="feature.icon.alt"
            class="w-16 h-16 mb-4 mx-auto"
          />
          <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
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