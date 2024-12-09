<template>
  <div>
    <Header v-if="!isFreebiesPage" />
    <main>
      <slot />
    </main>
    <Footer v-if="shouldShowFooter" :blok="footerData" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStoryblokApi } from '@storyblok/vue'
import { useRoute } from 'vue-router'
import Footer from '~/components/Footer.vue'

const route = useRoute()
const storyblokApi = useStoryblokApi()
const footerData = ref(null)

const isFreebiesPage = computed(() => {
  return route.path.includes('/freebies/')
})

const shouldShowFooter = computed(() => {
  return footerData.value && !isFreebiesPage.value
})

onMounted(async () => {
  try {
    const { data } = await storyblokApi.get('cdn/stories/site-footer', {
      version: 'published'
    })
    footerData.value = data.story.content
  } catch (error) {
    console.error('Error fetching footer data:', error)
  }
})
</script>