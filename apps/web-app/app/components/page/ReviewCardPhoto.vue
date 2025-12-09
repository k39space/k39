<template>
  <div
    class="shrink-0 aspect-square rounded-lg border border-default cursor-pointer hover:scale-105 transition duration-200"
    @click="modalShowPhoto.open({ src: maximalSrc, alt })"
  >
    <img
      :src="minimalSrc"
      :alt="alt"
      class="w-full h-full object-cover rounded-lg"
    >
  </div>
</template>

<script setup lang="ts">
import type { PhotoWithData } from '@k39/database'
import ModalShowPhoto from '../modal/ShowPhoto.vue'

const { photo } = defineProps<{ photo: PhotoWithData, alt: string }>()

const { public: { photoUrl } } = useRuntimeConfig()

const format = ref('jpeg')
const jpegPhotos = computed(() => photo.versions.filter((version) => version.format === format.value))
const minimalJpegPhoto = computed(() => jpegPhotos.value.toSorted((a, b) => a.width - b.width)[0])
const maximalJpegPhoto = computed(() => jpegPhotos.value.toSorted((a, b) => b.width - a.width)[0])

const minimalSrc = computed(() => `${photoUrl}/${photo.id}/${minimalJpegPhoto.value?.name}`)
const maximalSrc = computed(() => `${photoUrl}/${photo.id}/${maximalJpegPhoto.value?.name}`)

const overlay = useOverlay()
const modalShowPhoto = overlay.create(ModalShowPhoto)
</script>
