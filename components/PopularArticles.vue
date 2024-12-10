# components/PopularArticles.vue
<template>
  <div class="py-24">
    <h2 
      v-if="blok?.headline" 
      class="text-6xl text-[#50b0ae] font-bold text-center mb-12"
    >
      {{ blok.headline }}
    </h2>
    <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
      <!-- Loop through articles and render ArticleCard -->
      <ArticleCard
        v-for="article in (blok?.articles || [])"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  blok: {
    type: Object,
    default: () => ({
      headline: 'More Articles',
      articles: []
    })
  }
})
</script>