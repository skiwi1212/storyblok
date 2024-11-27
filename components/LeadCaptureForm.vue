<template>
    <div class="lead-capture-form">
      <h2>{{ blok.heading }}</h2>
      <p>{{ blok.description }}</p>
      <form @submit.prevent="submitForm">
        <div>
          <input
            type="email"
            v-model="formData.email"
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit">{{ blok.submitbuttontext || 'Submit' }}</button>
      </form>
      <p v-if="formSubmitted">{{ blok.successmessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      blok: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        formData: {
          email: '',
        },
        formSubmitted: false,
      };
    },
    methods: {
      submitForm() {
        console.log('Form submitted with email:', this.formData.email);
        this.formSubmitted = true;
      },
    },
  };
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
  .lead-capture-form button:hover {
    background-color: #0056b3;
  }
  </style>
  