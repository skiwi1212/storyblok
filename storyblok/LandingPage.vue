<template>
    <div v-editable="blok">
      <!-- Hero Section -->
      <StoryblokComponent
        v-if="blok.hero?.length"
        :blok="blok.hero[0]"
      />
  
      <!-- Content Sections -->
      <div class="container mx-auto px-4">
        <StoryblokComponent
          v-for="section in blok.sections"
          :key="section._uid"
          :blok="section"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    blok: {
      type: Object,
      required: true
    }
  })
  </script>