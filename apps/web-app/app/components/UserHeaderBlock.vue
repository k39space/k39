<template>
  <UButton
    v-if="!loggedIn"
    to="/sign-in"
    size="lg"
    label="Войти"
  />
  <UserMenu v-else />
</template>

<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>
