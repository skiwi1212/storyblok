<script setup>
import BlogListing from '~/layouts/BlogListing.vue'
import { computed } from 'vue'

const { slug } = useRoute().params

const resolveRelations = ['popular-articles.articles']

// Fetch the story from Storyblok
const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
  {
    version: 'draft',
    resolve_relations: resolveRelations
  },
  {
    resolveRelations
  }
)

// Use BlogListing layout if slug matches 'blog'
const isBlogPage = computed(() => slug?.[0] === 'blog')
</script>

<template>
  <div>
    <BlogListing v-if="isBlogPage && story" :blok="story.content" />
    <StoryblokComponent v-else-if="story" :blok="story.content" />
  </div>
</template>
