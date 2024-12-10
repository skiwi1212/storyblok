<template>
  <div
    v-editable="blok"
    class="container mx-auto grid md:grid-cols-3 gap-8 my-12 place-items-stretch"
  >
    <div
      v-for="blok in blok.columns"
      :key="blok._uid"
      class="flex flex-col items-stretch bg-white rounded-lg shadow-lg"
    >
      <!-- Image Section -->
      <div class="w-full h-60 flex-shrink-0">
        <img
          :src="blok.image.filename"
          :alt="blok.image.alt"
          class="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <!-- Text Section -->
      <div class="flex flex-col justify-between flex-grow p-4">
        <h3 class="text-lg font-semibold text-center text-gray-800">
          {{ blok.name }}
        </h3>
        <p v-if="blok.description" class="mt-2 text-center text-sm text-gray-600">
          {{ blok.description.content[0]?.content[0]?.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive layout */
  gap: 2rem; /* Space between items */
}

div[v-for] {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%; /* Match tallest sibling */
}

h3,
p {
  margin: 0;
}

img {
  width: 100%;
  height: 15rem; /* Fixed height for images */
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0 0; /* Rounded top corners */
}

.flex-grow {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}
</style>
