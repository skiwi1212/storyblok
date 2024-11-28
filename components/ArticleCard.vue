<template>
  <NuxtLink
    :to="'/' + slug"
    v-editable="article"
    class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden shadow-md hover:shadow-lg transition-shadow"
  >
    <!-- Article Image -->
    <img
      v-if="imageUrl"
      :src="optimizedImageSrc"
      :alt="imageAlt"
      :width="optimizedWidth"
      :height="optimizedHeight"
      class="w-full h-48 xl:h-72 object-cover pointer-events-none rounded-t-md"
      loading="lazy"
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
const props = defineProps({
  article: Object,
  slug: String,
})

const imageUrl = computed(() => {
  if (!props.article.image) return null
  return typeof props.article.image === 'string' 
    ? props.article.image 
    : props.article.image.filename
})

const imageAlt = computed(() => {
  if (!props.article.image || typeof props.article.image === 'string') return ''
  return props.article.image.alt || props.article.title || ''
})

const optimizedImageSrc = computed(() => {
  if (!imageUrl.value) return null
  
  // Hardcode optimization settings
  const width = 400;
  const height = 300;
  const quality = 80;
  const format = 'webp';

  // Generate optimized image URL
  const url = new URL(imageUrl.value);
  url.searchParams.set('width', width);
  url.searchParams.set('height', height);
  url.searchParams.set('quality', quality);
  url.searchParams.set('format', format);

  return url.toString();
})

const optimizedWidth = computed(() => {
  return 400;
})

const optimizedHeight = computed(() => {
  return 300; 
})
</script>

<style scoped>
.article-card {
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
  overflow: hidden;
}

.article-image {
  width: 40%;
  height: auto;
  object-fit: cover;
}

.article-content {
  flex: 1;
  padding: 1.5rem;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.article-excerpt {
  font-size: 0.875rem;
  color: #4a5568;
}
</style>