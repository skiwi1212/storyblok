<template>
  <div class="py-24">
    <h2 class="text-6xl text-[#50b0ae] font-bold text-center mb-12">
      {{ blok.title }}
    </h2>
    <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
      <!-- Loop through articles and render each one -->
      <ArticleCard
        v-for="article in articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStoryblokApi } from '@storyblok/nuxt'
import ArticleCard from '~/components/ArticleCard.vue'

// Props passed from Storyblok
defineProps({
  blok: Object, // Includes data like the title
})

// Reactive variable to hold articles
const articles = ref([])

// Fetch articles from Storyblok
const fetchArticles = async () => {
  try {
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories', {
      version: 'draft', // Use 'published' for live content
      starts_with: 'articles', // Path to your folder in Storyblok
      is_startpage: false, // Exclude the folder's homepage
    })
    articles.value = data.stories
    console.log('Fetched articles:', articles.value) // Debug output
  } catch (error) {
    console.error('Failed to fetch articles:', error)
  }
}

// Fetch articles when the component is mounted
onMounted(fetchArticles)
</script>
