<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})

const toast = useToast()
const { fetch } = useUserSession()

// Form state
const isLogin = ref(true);
const loading = ref(false);

// Login form
const loginForm = reactive({
  username: '',
  password: '',
});

// Registration form
const registerForm = reactive({
  username: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

async function handleLogin() {
  try {
    // Basic validation
    if (!loginForm.username.trim()) {
      toast.add({ title: 'Username is required', color: 'error' });
      return;
    }
    if (!loginForm.password) {
      toast.add({ title: 'Password is required', color: 'error' });
      return;
    }

    loading.value = true;

    await $fetch('/api/auth/login', {
      method: 'POST',
      body: loginForm,
    });

    await fetch();
    await navigateTo('/todos');

    toast.add({
      title: 'Login successful',
      color: 'success',
    });
  } catch (error: any) {
    toast.add({
      title: error.data?.message || 'Login failed',
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
}

async function handleRegister() {
  try {
    // Basic validation
    if (!registerForm.username.trim() || registerForm.username.length < 3) {
      toast.add({
        title: 'Username must be at least 3 characters',
        color: 'error',
      });
      return;
    }
    if (!registerForm.name.trim()) {
      toast.add({ title: 'Name is required', color: 'error' });
      return;
    }
    if (!registerForm.password || registerForm.password.length < 6) {
      toast.add({
        title: 'Password must be at least 6 characters',
        color: 'error',
      });
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.add({ title: "Passwords don't match", color: 'error' });
      return;
    }

    loading.value = true;

    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: registerForm.username,
        name: registerForm.name,
        email: registerForm.email || undefined,
        password: registerForm.password,
      },
    });

    await fetch();
    await navigateTo('/todos');

    toast.add({
      title: 'Registration successful',
      color: 'success',
    });
  } catch (error: any) {
    toast.add({
      title: error.data?.message || 'Registration failed',
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
}

function toggleForm() {
  isLogin.value = !isLogin.value;
  // Reset forms
  Object.assign(loginForm, { username: '', password: '' });
  Object.assign(registerForm, {
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold leading-6">
            {{ isLogin ? 'Login' : 'Register' }}
          </h3>
          <UButton to="/" icon="i-lucide-arrow-left" label="Back home" color="neutral" variant="ghost" size="sm" />
        </div>
      </template>

      <!-- OAuth Section -->
      <div class="space-y-4">
        <UButton to="/api/auth/github" icon="i-simple-icons-github" label="Continue with GitHub" color="neutral" block
          external />

        <USeparator label="or" />
      </div>

      <!-- Login Form -->
      <form v-if="isLogin" class="space-y-4" @submit.prevent="handleLogin">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Username *
          </label>
          <UInput v-model="loginForm.username" placeholder="Enter your username" :disabled="loading" required />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password *
          </label>
          <UInput v-model="loginForm.password" type="password" placeholder="Enter your password" :disabled="loading"
            required />
        </div>

        <UButton type="submit" color="primary" block :loading="loading" :disabled="loading">
          Login
        </UButton>
      </form>

      <!-- Registration Form -->
      <form v-else class="space-y-4" @submit.prevent="handleRegister">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Username *
          </label>
          <UInput v-model="registerForm.username" placeholder="Choose a username" :disabled="loading" required />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name *
          </label>
          <UInput v-model="registerForm.name" placeholder="Enter your full name" :disabled="loading" required />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <UInput v-model="registerForm.email" type="email" placeholder="Enter your email (optional)"
            :disabled="loading" />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password *
          </label>
          <UInput v-model="registerForm.password" type="password" placeholder="Choose a password" :disabled="loading"
            required />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password *
          </label>
          <UInput v-model="registerForm.confirmPassword" type="password" placeholder="Confirm your password"
            :disabled="loading" required />
        </div>

        <UButton type="submit" color="primary" block :loading="loading" :disabled="loading">
          Register
        </UButton>
      </form>

      <template #footer>
        <div class="text-center">
          <UButton :label="isLogin
            ? 'Need an account? Register'
            : 'Already have an account? Login'
            " color="neutral" variant="link" @click="toggleForm" :disabled="loading" />
        </div>
      </template>
    </UCard>
  </div>
</template>
