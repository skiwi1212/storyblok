<template>
  <div
    v-editable="blok"
    class="w-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"
  >
    <img
      v-if="optimizedImageSrc"
      :src="optimizedImageSrc"
      :alt="imageAlt"
      :width="optimizedWidth"
      :height="optimizedHeight"
      class="w-full h-48 xl:h-72 object-cover"
      loading="lazy"
    />
    <div class="px-12 py-6">
      <h3 class="text-2xl text-[#1d243d] font-bold">
        {{ blok.name }}
      </h3>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })

const imageUrl = computed(() => {
  if (!props.blok.image) return null
  return typeof props.blok.image === 'string' 
    ? props.blok.image 
    : props.blok.image.filename
})

const imageAlt = computed(() => {
  if (!props.blok.image || typeof props.blok.image === 'string') return ''
  return props.blok.image.alt || ''
})

const optimizedImageSrc = computed(() => {
  if (!imageUrl.value) return null
  
  // Generate optimized image URL
  const url = new URL(imageUrl.value)
  url.searchParams.set('width', 600)
  url.searchParams.set('height', 400)
  url.searchParams.set('quality', 80)
  url.searchParams.set('format', 'webp')

  return url.toString()
})

const optimizedWidth = computed(() => {
  return 600
})

const optimizedHeight = computed(() => {
  return 400
})
</script>