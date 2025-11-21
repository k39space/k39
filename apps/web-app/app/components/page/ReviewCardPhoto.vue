<template>
  <div class="shrink-0 size-28 rounded-lg border border-default">
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover rounded-lg"
    >
  </div>
</template>

<script setup lang="ts">
import type { PhotoWithData } from '@k39/database'

const { photo } = defineProps<{ photo: PhotoWithData, alt: string }>()

const { public: { photoUrl } } = useRuntimeConfig()

const format = ref('jpeg')
const jpegPhotos = computed(() => photo.versions.filter((version) => version.format === format.value))
const minimalJpegPhoto = computed(() => jpegPhotos.value.toSorted((a, b) => a.width - b.width)[0])
const src = computed(() => `${photoUrl}/${photo.id}/${minimalJpegPhoto.value?.name}`)
</script>
