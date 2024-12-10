# storyblok/Article.vue
<template>
  <div v-editable="blok">
    <!-- Full width header image -->
    <img
      v-if="blok.image?.filename"
      :src="optimizedImageSrc"
      :alt="blok.image.alt"
      :width="optimizedWidth"
      :height="optimizedHeight"
      class="w-full h-[360px] lg:h-[450px] object-cover"
      loading="lazy"
    />
    
    <!-- Main content area with sidebar -->
    <div class="container mx-auto">
      <!-- 20/80 split container -->
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar - 20% -->
        <aside class="w-full md:w-1/5">
          <div class="sticky top-4 bg-gray-50 p-4 rounded-lg space-y-6">
            <!-- Quick Overview Section -->
            <div class="space-y-4">
              <h3 class="font-bold text-lg">Quick Overview</h3>
              <p class="text-gray-600">{{ blok.teaser }}</p>
            </div>

            <!-- Categories Section -->
            <div v-if="blok.categories?.length" class="space-y-4">
              <h3 class="font-bold text-lg">Categories</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="category in blok.categories" 
                  :key="category"
                  class="bg-[#50b0ae] text-white px-3 py-1 rounded-full text-sm"
                >
                  {{ formatLabel(category) }}
                </span>
              </div>
            </div>

            <!-- Tags Section -->
            <div v-if="blok.tags?.length" class="space-y-4">
              <h3 class="font-bold text-lg">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in blok.tags" 
                  :key="tag"
                  class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {{ formatLabel(tag) }}
                </span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main content - 80% -->
        <div class="w-full md:w-4/5">
          <h1 class="text-6xl text-[#50b0ae] font-bold mt-12 mb-4">{{ blok.title }}</h1>
          <div v-html="resolvedRichText" class="prose lg:prose-xl max-w-none"></div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="border-t border-gray-200 my-12">
        <div class="py-8">
          <div class="flex justify-between items-center">
            <NuxtLink
              v-if="prevArticle"
              :to="'/' + prevArticle.full_slug"
              class="flex items-center text-[#50b0ae] hover:text-[#3d8d8b]"
            >
              <span class="mr-2">←</span>
              Previous Article
            </NuxtLink>
            <div v-else class="invisible">Placeholder</div>

            <NuxtLink
              v-if="nextArticle"
              :to="'/' + nextArticle.full_slug"
              class="flex items-center text-[#50b0ae] hover:text-[#3d8d8b]"
            >
              Next Article
              <span class="ml-2">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Related Articles Component -->
      <div class="mb-12">
        <PopularArticles :blok="{ 
          headline: 'Related Articles', 
          articles: relatedArticles 
        }" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(props.blok.content))

// Format labels by capitalizing and replacing hyphens
const formatLabel = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

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

// Add pagination and related articles functionality
const storyblokApi = useStoryblokApi()
const prevArticle = ref(null)
const nextArticle = ref(null)
const relatedArticles = ref([])

// Fetch adjacent and related articles
const fetchArticles = async () => {
  try {
    const currentSlug = props.blok._uid
    const currentCategories = props.blok.categories || []
    const currentTags = props.blok.tags || []

    // Fetch related articles based on categories and tags
    const { data: relatedData } = await storyblokApi.get('cdn/stories', {
      version: 'draft',
      starts_with: 'articles/',
      excluding_slugs: props.blok.full_slug,
      sort_by: 'first_published_at:desc',
      ...(currentCategories.length > 0 && {
        filter_query: {
          'content.categories': {
            'in_array': currentCategories
          }
        }
      })
    })

    // Sort related articles by matching categories and tags
    const sortedArticles = relatedData.stories.sort((a, b) => {
      const aMatches = countMatches(a.content, currentCategories, currentTags)
      const bMatches = countMatches(b.content, currentCategories, currentTags)
      return bMatches - aMatches
    })

    // Set related articles (limit to 3)
    relatedArticles.value = sortedArticles.slice(0, 3)

    // Fetch all articles for pagination
    const { data } = await storyblokApi.get('cdn/stories', {
      version: 'draft',
      starts_with: 'articles/',
      sort_by: 'first_published_at:desc'
    })

    const articles = data.stories
    const currentIndex = articles.findIndex(story => story.content._uid === currentSlug)

    if (currentIndex > 0) {
      prevArticle.value = articles[currentIndex - 1]
    }
    
    if (currentIndex < articles.length - 1) {
      nextArticle.value = articles[currentIndex + 1]
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

// Helper function to count matching categories and tags
const countMatches = (content, categories, tags) => {
  let matches = 0
  
  // Count matching categories
  content.categories?.forEach(category => {
    if (categories.includes(category)) matches += 2 // Categories worth more
  })
  
  // Count matching tags
  content.tags?.forEach(tag => {
    if (tags.includes(tag)) matches += 1
  })
  
  return matches
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>