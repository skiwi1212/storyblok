<template>
  <div
    v-editable="blok"
    class="min-h-[500px] relative flex items-end justify-center my-6 rounded-[5px] overflow-hidden"
    :class="heroClasses"
  >
    <div
      class="relative z-10 w-full text-center bg-gradient-to-t from-black/70 via-black/50 to-transparent py-6"
    >
      <h1 class="text-6xl text-white font-bold mb-3">
        {{ blok.headline }}
      </h1>
      <h2 class="text-4xl text-white font-light">
        {{ blok.subheadline }}
      </h2>
    </div>
    <img
      v-if="optimizedImageSrc"
      :src="optimizedImageSrc"
      :alt="imageAlt"
      :width="optimizedWidth"
      :height="optimizedHeight"
      class="absolute top-0 left-0 z-0 w-full h-full object-cover"
      loading="lazy"
    />
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })

const heroClasses = computed(() => {
  return props.blok.layout === 'constrained' ? 'container mx-auto' : ''
})

const imageUrl = computed(() => {
  if (!props.blok.background_image) return null
  return typeof props.blok.background_image === 'string'
    ? props.blok.background_image
    : props.blok.background_image.filename
})

const imageAlt = computed(() => {
  if (!props.blok.background_image || typeof props.blok.background_image === 'string') return ''
  return props.blok.background_image.alt || ''
})

const optimizedImageSrc = computed(() => {
  if (!imageUrl.value) return null

  // Generate optimized image URL
  const parsedUrl = new URL(imageUrl.value)
  parsedUrl.searchParams.set('width', 1600)
  parsedUrl.searchParams.set('height', 900)
  parsedUrl.searchParams.set('quality', 80)
  parsedUrl.searchParams.set('format', 'webp')

  return parsedUrl.toString()
})

const optimizedWidth = computed(() => {
  return 1600
})

const optimizedHeight = computed(() => {
  return 900
})
</script>