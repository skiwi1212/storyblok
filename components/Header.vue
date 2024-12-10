<script setup>
import { ref } from 'vue'

const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url', // Ensure internal links are resolved
})

const headerMenu = ref(null)
headerMenu.value = data.story.content.header_menu

// Toggle state for the mobile menu
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="w-full h-24 bg-[#f7f6fd]">
    <div class="container h-full mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/">
        <h1 class="text-[#50b0ae] text-3xl font-bold">LU English</h1>
      </NuxtLink>

      <!-- Hamburger Icon for Mobile -->
      <button 
        class="lg:hidden flex flex-col items-center justify-center space-y-1 p-2" 
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
      >
        <span class="block w-6 h-0.5 bg-black"></span>
        <span class="block w-6 h-0.5 bg-black"></span>
        <span class="block w-6 h-0.5 bg-black"></span>
      </button>

      <!-- Navigation Menu -->
      <nav 
        class="hidden lg:flex space-x-8 text-lg font-bold"
        :class="{ 'lg:flex': !isMenuOpen }"
      >
        <ul class="flex space-x-8">
          <li v-for="blok in headerMenu" :key="blok._uid">
            <NuxtLink :to="`/${blok.link.cached_url}`" class="hover:text-[#50b0ae]">
              {{ blok.link.story?.name || blok.link.cached_url }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Modal Dropdown for Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="fixed inset-0 bg-[#f7f6fd] z-50 flex flex-col items-center justify-center space-y-6"
    >
      <button 
        class="absolute top-4 right-4 p-2 text-2xl font-bold" 
        @click="toggleMenu"
        aria-label="Close navigation menu"
      >
        &times;
      </button>
      <ul class="text-lg font-bold space-y-4">
        <li v-for="blok in headerMenu" :key="blok._uid">
          <NuxtLink 
            :to="`/${blok.link.cached_url}`" 
            class="hover:text-[#50b0ae]" 
            @click="toggleMenu"
          >
            {{ blok.link.story?.name || blok.link.cached_url }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* Add animation for the hamburger icon and modal */
button span {
  transition: transform 0.3s ease, background-color 0.3s ease;
}

button:hover span {
  background-color: #50b0ae;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
