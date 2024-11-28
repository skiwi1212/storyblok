<template>
  <div v-editable="blok">
    <img
      v-if="blok.image?.filename"
      :src="optimizedImageSrc"
      :alt="blok.image.alt"
      :width="optimizedWidth"
      :height="optimizedHeight"
      class="w-full h-[360px] lg:h-[450px] object-cover"
      loading="lazy"
    />
    <div class="container mx-auto mb-12">
      <h1 class="text-6xl text-[#50b0ae] font-bold mt-12 mb-4">{{ blok.title }}</h1>
      <h2 class="text-2xl text-[#1d243d] font-bold mb-4">
        {{ blok.subtitle }}
      </h2>
      <div v-html="resolvedRichText" class="prose"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(props.blok.content))

const optimizedImageSrc = computed(() => {
  if (!props.blok.image?.filename) return ''

  // Generate optimized image URL
  const url = new URL(props.blok.image.filename)
  url.searchParams.set('width', 800)
  url.searchParams.set('height', 450)
  url.searchParams.set('quality', 80)
  url.searchParams.set('format', 'webp')

  return url.toString()
})

const optimizedWidth = computed(() => {
  return 800
})

const optimizedHeight = computed(() => {
  return 450
})
</script>

<style scoped>
.article {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.article-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.article-body {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #4a5568;
}
</style>