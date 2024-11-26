<script setup>
const { slug } = useRoute().params

// Added: Define the relations to resolve
const resolveRelations = ['popular-articles.articles']

// Updated: Fetch the story with resolved relations
const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
  {
    version: 'draft', // Existing option
    resolve_relations: resolveRelations // Added option
  },
  {
    resolveRelations // Added for the Storyblok Bridge
  }
)
</script>

<template>
  <div>
    <!-- Render Storyblok components -->
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
