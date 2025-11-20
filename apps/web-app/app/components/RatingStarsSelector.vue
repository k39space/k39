<template>
  <div class="flex flex-row gap-0">
    <UIcon
      v-for="star in 5"
      :key="star"
      name="fluent:star-28-filled"
      class="size-8 cursor-pointer transition-colors duration-200"
      :class="getStarClass(star)"
      @click="setRating(star)"
      @mouseenter="() => localRating = star"
      @mouseleave="() => localRating = props.modelValue ?? 0"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: number
}>()

const emit = defineEmits(['update:modelValue', 'blur', 'change'])

defineModel<number>()

const localRating = ref(props.modelValue ?? 0)

function getStarClass(position: number) {
  const isFilled = position <= localRating.value

  return {
    'text-amber-300': isFilled,
    'text-dimmed/15 hover:text-amber-400': !isFilled,
  }
}

function setRating(stars: number) {
  localRating.value = stars
  emit('update:modelValue', stars)
  emit('change')
  emit('blur')
}
</script>
