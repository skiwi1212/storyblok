<template>
    <div class="auth-container">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input v-model="name" id="name" type="text" placeholder="John Doe" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" id="email" type="email" placeholder="example@example.com" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" id="password" type="password" placeholder="********" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input v-model="confirmPassword" id="confirmPassword" type="password" placeholder="********" required class="form-control" />
        </div>
        <div v-if="error" class="alert error">{{ error }}</div>
        <div v-if="success" class="alert success">{{ success }}</div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const error = ref(null);
  const success = ref(null);
  const router = useRouter();
  
  const register = async () => {
    error.value = null;
    success.value = null;
  
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match';
      return;
    }
  
    try {
      const response = await $fetch('/api/register', {
        method: 'POST',
        body: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      });
  
      if (response.success) {
        success.value = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        error.value = response.message || 'Registration failed';
      }
    } catch (err) {
      error.value = 'An error occurred while registering. Please try again later.';
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .auth-container h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .form-control:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
  
  .btn {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  .alert {
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .alert.error {
    background-color: #f8d7da;
    color: #842029;
    border: 1px solid #f5c2c7;
  }
  
  .alert.success {
    background-color: #d1e7dd;
    color: #0f5132;
    border: 1px solid #badbcc;
  }
  </style>
  