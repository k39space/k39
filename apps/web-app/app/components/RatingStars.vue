<template>
  <div class="relative">
    <div class="absolute flex flex-row items-center gap-0">
      <UIcon
        v-for="i in stars"
        :key="i"
        name="fluent:star-28-filled"
        class="size-6 text-dimmed/25"
      />
    </div>
    <div class="flex flex-row items-center gap-0">
      <template v-for="star in stars" :key="star">
        <UIcon
          v-if="star === 0"
          name="fluent:star-28-filled"
          class="size-6 text-transparent"
        />
        <UIcon
          v-if="star === 0.5"
          name="fluent:star-half-28-filled"
          class="size-6 text-amber-300"
        />
        <UIcon
          v-if="star === 1"
          name="fluent:star-28-filled"
          class="size-6 text-amber-300"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { rating } = defineProps<{ rating: number }>()

const stars: [number, number, number, number, number] = [0, 0, 0, 0, 0]

for (let i = 0; i < 5; i++) {
  if (i < Math.round(rating)) {
    // 0.5 or 1?
    if (rating - i > 0.8) {
      stars[i] = 1
    } else {
      stars[i] = 0.5
    }
  }
}
</script>
