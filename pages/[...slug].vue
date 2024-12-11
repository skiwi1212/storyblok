<script setup>
import BlogListing from '~/layouts/BlogListing.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { slug } = useRoute().params;

const resolveRelations = ['popular-articles.articles'];

// Determine if this is a static route
const isStaticRoute = computed(() => ['login', 'register'].includes(slug?.[0]));

// If it's a static route, skip fetching Storyblok content
let story = null;

if (!isStaticRoute.value) {
  // Fetch the story from Storyblok
  story = await useAsyncStoryblok(
    slug && slug.length > 0 ? slug.join('/') : 'home',
    {
      version: 'draft',
      resolve_relations: resolveRelations,
    },
    {
      resolveRelations,
    }
  );
}

// Use BlogListing layout if slug matches 'blog'
const isBlogPage = computed(() => slug?.[0] === 'blog');
</script>

<template>
  <div>
    <div v-if="isStaticRoute">
      <!-- Placeholder for static routes -->
      <p>This route is handled statically (e.g., login or register).</p>
    </div>
    <BlogListing v-else-if="isBlogPage && story" :blok="story.content" />
    <StoryblokComponent v-else-if="story" :blok="story.content" />
  </div>
</template>
