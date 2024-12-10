<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true
  }
});

const route = useRoute();
const storyblokApi = useStoryblokApi();

// State for adjacent articles
const prevArticle = ref(null);
const nextArticle = ref(null);

// Fetch adjacent articles
const fetchAdjacentArticles = async () => {
  try {
    // Get current article's publish date
    const currentDate = props.blok.publish_date;

    // Fetch previous article
    const prevResponse = await storyblokApi.get('cdn/stories', {
      version: 'draft',
      starts_with: 'articles/',
      sort_by: 'content.publish_date:desc',
      filter_query: {
        'content.publish_date': {
          'lt': currentDate
        }
      },
      per_page: 1
    });

    // Fetch next article
    const nextResponse = await storyblokApi.get('cdn/stories', {
      version: 'draft',
      starts_with: 'articles/',
      sort_by: 'content.publish_date:asc',
      filter_query: {
        'content.publish_date': {
          'gt': currentDate
        }
      },
      per_page: 1
    });

    prevArticle.value = prevResponse.data.stories[0] || null;
    nextArticle.value = nextResponse.data.stories[0] || null;
  } catch (error) {
    console.error('Error fetching adjacent articles:', error);
  }
};

// Fetch adjacent articles when component mounts
onMounted(() => {
  fetchAdjacentArticles();
});
</script>

<template>
  <article class="min-h-screen">
    <!-- Full width header image -->
    <div class="w-full h-96 relative">
      <img 
        :src="blok.image?.filename"
        :alt="blok.image?.alt"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Main content area with sidebar -->
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row py-8 gap-8">
        <!-- Sidebar - 20% -->
        <aside class="w-full lg:w-1/5">
          <div class="bg-gray-50 p-4 rounded-lg sticky top-4">
            <h2 class="text-xl font-bold mb-4">{{ blok.sidebar_title }}</h2>
            <!-- Add your sidebar content here -->
          </div>
        </aside>

        <!-- Main content - 80% -->
        <div class="w-full lg:w-4/5">
          <h1 class="text-4xl font-bold mb-6">{{ blok.title }}</h1>
          <div class="prose lg:prose-xl max-w-none">
            {{ blok.content }}
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="border-t border-gray-200">
      <div class="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center">
          <NuxtLink
            v-if="prevArticle"
            :to="'/' + prevArticle.full_slug"
            class="flex items-center text-blue-600 hover:text-blue-800"
          >
            <span class="mr-2">←</span>
            Previous Article
          </NuxtLink>
          <div v-else class="invisible">Placeholder</div>

          <NuxtLink
            v-if="nextArticle"
            :to="'/' + nextArticle.full_slug"
            class="flex items-center text-blue-600 hover:text-blue-800"
          >
            Next Article
            <span class="ml-2">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Popular Articles -->
    <div class="bg-gray-50 py-12">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <PopularArticles />
      </div>
    </div>
  </article>
</template>