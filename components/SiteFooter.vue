<script setup>
defineProps({
  blok: {
    type: Object,
    default: () => ({})
  }
})

defineOptions({
  name: 'sitefooter'
})
</script>

<template>
  <footer v-if="blok && Object.keys(blok).length > 0" class="bg-gray-900 text-gray-300 py-12">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <!-- Company Info Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-bold mb-4">{{ blok.company_name }}</h3>
          <p class="mb-2">
            <a :href="'mailto:' + blok.email1" class="text-gray-400 hover:text-blue-400 transition-colors">
              {{ blok.email1 }}
            </a>
          </p>
          <p class="mb-2">
            <a :href="'mailto:' + blok.email2" class="text-gray-400 hover:text-blue-400 transition-colors">
              {{ blok.email2 }}
            </a>
          </p>
          <p class="whitespace-pre-wrap text-gray-400">{{ blok.address }}</p>
        </div>

        <!-- Courses Links -->
        <div>
          <h3 class="text-white font-bold mb-4">Courses</h3>
          <ul class="space-y-2">
            <li v-for="link in blok.courses_links" :key="link._uid">
              <StoryblokComponent 
                :blok="{ ...link, class: 'text-gray-400 hover:text-blue-400 transition-colors' }"
              />
            </li>
          </ul>
        </div>

        <!-- Resources Links -->
        <div>
          <h3 class="text-white font-bold mb-4">Resources</h3>
          <ul class="space-y-2">
            <li v-for="link in blok.resources_links" :key="link._uid">
              <StoryblokComponent 
                :blok="{ ...link, class: 'text-gray-400 hover:text-blue-400 transition-colors' }"
              />
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="text-white font-bold mb-4">Company</h3>
          <ul class="space-y-2">
            <li v-for="link in blok.company_links" :key="link._uid">
              <StoryblokComponent 
                :blok="{ ...link, class: 'text-gray-400 hover:text-blue-400 transition-colors' }"
              />
            </li>
          </ul>
        </div>
      </div>

      <!-- Company Description -->
      <div class="mt-12">
        <p class="text-gray-300">{{ blok.company_description }}</p>
      </div>

      <!-- Footer Text -->
      <div class="mt-8 pt-8 border-t border-gray-800">
        <p class="text-gray-400 text-sm">{{ blok.footer_text }}</p>
      </div>
    </div>
  </footer>
</template>