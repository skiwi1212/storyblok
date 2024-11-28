<template>
  <section v-editable="blok" class="py-16">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4">{{ blok.title }}</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">{{ blok.description }}</p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <div 
        v-for="feature in blok.features" 
        :key="feature._uid"
        class="p-6 bg-white rounded-[5px] shadow-md"
      >
        <img 
          v-if="feature.icon?.filename"
          :src="optimizedIconSrc(feature.icon.filename)"
          :alt="feature.icon.alt"
          :width="optimizedIconWidth"
          :height="optimizedIconHeight"
          class="w-16 h-16 mb-4 mx-auto"
          loading="lazy"
        />
        <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
        <p class="text-gray-600">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true
  }
})

const optimizedIconSrc = (url) => {
  if (!url) return ''

  // Generate optimized image URL
  const parsedUrl = new URL(url)
  parsedUrl.searchParams.set('width', 64)
  parsedUrl.searchParams.set('height', 64)
  parsedUrl.searchParams.set('quality', 80)
  parsedUrl.searchParams.set('format', 'webp')

  return parsedUrl.toString()
}

const optimizedIconWidth = 64
const optimizedIconHeight = 64
</script>