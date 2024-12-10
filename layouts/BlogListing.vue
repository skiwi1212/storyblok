<script setup>
import { ref, computed } from 'vue';
import { useStoryblokApi } from '@storyblok/vue';

// State Variables
const postsPerPage = 12;
const currentPage = ref(1);
const allBlogPosts = ref([]);
const categories = ref([]);
const selectedDropdownCategory = ref(''); // Temporary selected value for dropdown
const selectedCategory = ref(''); // Actual applied category for filtering

// Fetch Blog Posts
const fetchBlogPosts = async () => {
  const storyblokApi = useStoryblokApi();

  try {
    const { data } = await storyblokApi.get('cdn/stories', {
      version: 'draft',
      starts_with: 'articles/',
      sort_by: 'first_published_at:desc',
    });

    allBlogPosts.value = data.stories;

    // Extract unique categories from blog posts
    const allCategories = new Set();
    allBlogPosts.value.forEach((post) => {
      post.content.categories?.forEach((category) => allCategories.add(category));
    });
    categories.value = [
      { value: '', label: 'All Categories' },
      ...Array.from(allCategories)
        .map((category) => ({
          value: category,
          label: category
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
};

// Call fetchBlogPosts on component mount
fetchBlogPosts();

// Paginated Posts
const filteredPosts = computed(() => {
  if (!selectedCategory.value) {
    return allBlogPosts.value;
  }
  return allBlogPosts.value.filter((post) =>
    post.content.categories?.includes(selectedCategory.value),
  );
});
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

// Total Pages
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage);
});

// Change Page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Apply the category selected via the Go button
const applyCategoryFilter = () => {
  selectedCategory.value = selectedDropdownCategory.value;
  currentPage.value = 1;
};

// Change Category for Desktop
const filterByCategory = (category = '') => {
  selectedCategory.value = category;
  currentPage.value = 1;
};
</script>

<template>
  <div class="container mx-auto px-4 md:px-6 lg:px-8 py-8">
    <!-- Layout Wrapper -->
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar -->
      <aside class="w-full md:w-1/5">
        <div class="bg-gray-50 p-4 rounded-lg sticky top-4">
          <h3 class="text-xl font-bold mb-4">Categories</h3>
          <ul class="space-y-2 hidden md:block">
            <li
              v-for="category in categories"
              :key="category.value"
              class="w-full"
            >
              <button
                class="w-full text-left text-blue-600 hover:text-blue-800"
                @click.prevent="filterByCategory(category.value)"
              >
                {{ category.label }}
              </button>
            </li>
          </ul>
          <!-- Dropdown for smaller screens -->
          <div class="md:hidden">
            <select
              class="w-full p-2 rounded border"
              v-model="selectedDropdownCategory"
            >
              <option
                v-for="category in categories"
                :key="category.value"
                :value="category.value"
              >
                {{ category.label }}
              </option>
            </select>
            <button
              class="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              @click="applyCategoryFilter"
            >
              Go
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="w-full md:w-4/5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Blog Posts -->
          <div
            v-for="post in paginatedPosts"
            :key="post.uuid"
            class="bg-white rounded-lg shadow-md p-4"
          >
            <img
              :src="post.content.image?.filename"
              :alt="post.content.image?.alt"
              class="w-full h-48 object-cover rounded-lg"
            />
            <h2 class="mt-4 text-xl font-bold text-gray-800">
              {{ post.content.title }}
            </h2>
            <p class="text-gray-600 mt-2 line-clamp-3">
              {{ post.content.teaser }}
            </p>
            <NuxtLink
              :to="`/${post.full_slug}`"
              class="text-blue-500 hover:text-blue-700 mt-4 inline-block"
            >
              Read More
            </NuxtLink>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center items-center space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            class="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200"
            :class="{
              'bg-blue-600 text-white': page === currentPage,
              'text-gray-700': page !== currentPage,
            }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
button {
  text-align: left;
}
</style>
