<template>
  <UButton
    v-if="!loggedIn"
    :to="`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`"
    size="lg"
    label="Войти"
  />
  <UserMenu v-else />
</template>

<script setup lang="ts">
const { loggedIn } = useUserSession()

const route = useRoute()
const redirectTo = computed(() => route.path)
</script>
