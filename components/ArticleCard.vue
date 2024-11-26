<template>
  <NuxtLink
    :to="'/' + slug"
    v-editable="article"
    class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden shadow-md hover:shadow-lg transition-shadow"
  >
    <!-- Article Image -->
    <img
      v-if="article.image"
      :src="article.image.filename + '/m/600x0'"
      :alt="article.image.alt || 'Article Image'"
      class="w-full h-48 xl:h-72 object-cover pointer-events-none rounded-t-md"
    />

    <!-- Article Content -->
    <div class="p-4">
      <h3 class="text-xl text-[#1d243d] font-bold mb-3">
        {{ article.title }}
      </h3>
      <p class="text-gray-600 line-clamp-3">
        {{ article.teaser }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  article: Object, // The article object from Storyblok
  slug: String,    // Full slug of the article for linking
})
</script>
