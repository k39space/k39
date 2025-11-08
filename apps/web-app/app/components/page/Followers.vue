<template>
  <div class="flex flex-col gap-2 items-end">
    <div>
      <h4 class="text-right text-2xl/6 font-bold">
        {{ count }}
      </h4>
      <p class="text-sm text-muted">
        {{ pluralizationRu(count, ['Подписчик', 'Подписчика', 'Подписчиков']) }}
      </p>
    </div>

    <UAvatarGroup>
      <UAvatar
        v-for="avatar in avatars"
        :key="avatar.src"
        :src="avatar.src"
      />
    </UAvatarGroup>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ count: number, avatars: { src: string }[] }>()
</script>
