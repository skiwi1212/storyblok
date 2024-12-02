# components/ServiceBlock.vue

<template>
  <div class="container mx-auto px-4 py-16">
    <div 
      class="flex flex-col gap-12 items-center"
      :class="[blok.Image_on_Left ? 'lg:flex-row' : 'lg:flex-row-reverse']"
    >
      <!-- Image Section -->
      <div class="w-full lg:w-1/2">
        <img 
          v-if="blok.Image?.filename"
          :src="blok.Image.filename"
          :alt="blok.Image.alt || blok.Title"
          class="rounded-lg w-full h-full object-cover shadow-lg"
        />
      </div>
      
      <!-- Content Section -->
      <div class="w-full lg:w-1/2">
        <div class="flex flex-col justify-center space-y-6">
          <div class="space-y-4">
            <h2 class="text-4xl font-bold" v-editable="blok">
              {{ blok.Title }}
            </h2>
            
            <div class="text-gray-600 text-lg prose prose-lg max-w-none">
              <div v-html="renderRichText(blok.Description)"></div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 pt-4">
            <NuxtLink
              v-if="blok.Primary_Link?.cached_url"
              :to="resolveFullSlug(blok.Primary_Link.cached_url)"
              class="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              {{ blok.Primary_CTA || 'Learn More' }}
            </NuxtLink>
            
            <NuxtLink
              v-if="blok.Secondary_Link?.cached_url"
              :to="resolveFullSlug(blok.Secondary_Link.cached_url)"
              class="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
            >
              {{ blok.Secondary_CTA || 'Get Started' }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { renderRichText } from '@storyblok/vue'

const props = defineProps({
  blok: {
    type: Object,
    required: true
  }
})

const resolveFullSlug = (cached_url) => {
  return cached_url === 'home' ? '/' : `/${cached_url}`
}
</script>

<style>
.prose :last-child {
  margin-bottom: 0;
}
</style>