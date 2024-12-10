<template>
  <div>
    <Header v-if="!isFreebiesPage" />
    <main class="container mx-auto px-4 md:px-6 lg:px-8">
      <slot />
    </main>
    <sitefooter v-if="shouldShowFooter" :blok="footerData" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStoryblokApi } from '@storyblok/vue';
import { useRoute } from 'vue-router';
import SiteFooter from '~/components/SiteFooter.vue';

const route = useRoute();
const storyblokApi = useStoryblokApi();
const footerData = ref(null);

const isFreebiesPage = computed(() => {
  return route.path.includes('/freebies/');
});

const shouldShowFooter = computed(() => {
  return footerData.value && !isFreebiesPage.value;
});

onMounted(async () => {
  try {
    const { data } = await storyblokApi.get('cdn/stories/site-footer', {
      version: 'published'
    });
    footerData.value = data.story.content;
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }
});
</script>