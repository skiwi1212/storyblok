<template>
  <div class="lead-capture-form">
    <h2 class="form-heading">{{ blok?.heading || 'Default Heading' }}</h2>
    <p class="form-description">{{ blok?.description || 'Default Description' }}</p>

    <form @submit.prevent="submitForm" class="form-container">
      <div class="input-group">
        <input
          type="email"
          v-model="formData.email"
          placeholder="Enter your email"
          required
          class="email-input"
        />
      </div>
      <input type="hidden" v-model="formData.page_slug" />
      <button type="submit" :disabled="isSubmitting" class="submit-button">
        {{ isSubmitting ? 'Submitting...' : (blok?.submitbuttontext || 'Submit') }}
      </button>
    </form>

    <p v-if="formSubmitted" class="success-message">
      {{ blok?.successmessage || 'Thank you for submitting!' }}
    </p>
    <p v-if="error" class="error-message">
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
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.form-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
  text-align: center;
}

.form-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.5;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  width: 100%;
}

.email-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #f9fafb;
}

.email-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #ffffff;
}

.submit-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.submit-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ecfdf5;
  color: #047857;
  border-radius: 6px;
  text-align: center;
  font-size: 0.875rem;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fef2f2;
  color: #dc2626;
  border-radius: 6px;
  text-align: center;
  font-size: 0.875rem;
}

@media (max-width: 640px) {
  .lead-capture-form {
    max-width: 100%;
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>