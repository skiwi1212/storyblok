<template>
  <div class="lead-capture-form">
    <h2>{{ blok?.heading || 'Default Heading' }}</h2>
    <p>{{ blok?.description || 'Default Description' }}</p>
    
    <form @submit.prevent="submitForm">
      <div>
        <input
          type="email"
          v-model="formData.email"
          placeholder="Enter your email"
          required
        />
      </div>
      <input type="hidden" v-model="formData.page_slug" />
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Submitting...' : (blok?.submitbuttontext || 'Submit') }}
      </button>
    </form>

    <p v-if="formSubmitted" class="text-green-600">
      {{ blok?.successmessage || 'Thank you for submitting!' }}
    </p>
    <p v-if="error" class="text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive } from 'vue'

const props = defineProps({ blok: Object })
const route = useRoute()
const pageSlug = route.params.slug ? route.params.slug.join('/') : 'home'

const formData = reactive({
  email: '',
  page_slug: pageSlug,
})

const formSubmitted = ref(false)
const isSubmitting = ref(false)
const error = ref('')

const submitForm = async () => {
  error.value = ''
  isSubmitting.value = true
  
  try {
    const response = await $fetch('/api/submit-form', {
      method: 'POST',
      body: formData
    })

    if (response.success) {
      formSubmitted.value = true
      formData.email = '' // Clear the form
    } else {
      error.value = response.error || 'There was an error submitting the form. Please try again.'
    }
  } catch (e) {
    console.error('Error:', e)
    error.value = 'There was an error submitting the form. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.lead-capture-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.lead-capture-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.lead-capture-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.lead-capture-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.lead-capture-form button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>