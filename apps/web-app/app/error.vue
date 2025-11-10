<template>
  <UApp>
    <NuxtLayout>
      <div class="flex flex-col max-w-sm mx-auto mt-16 text-center items-center">
        <h1 class="text-4xl font-bold mb-4">
          {{ $t('error.title') }} {{ error?.statusCode }}
        </h1>
        <p>{{ error?.message ?? error?.statusMessage }}</p>

        <UButton
          variant="solid"
          size="xl"
          class="mt-12 w-full justify-center"
          :label="$t('common.to-home')"
          @click="handleError"
        />
      </div>
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const { error } = defineProps<{ error: {
  statusCode: number
  statusMessage?: string
  message?: string
} }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>
