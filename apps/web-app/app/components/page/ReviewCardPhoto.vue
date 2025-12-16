<template>
  <div
    class="shrink-0 aspect-square rounded-lg border border-default cursor-pointer hover:scale-105 transition duration-200"
  >
    <picture v-if="minimalWebpPhoto || minimalJpegPhoto">
      <source
        v-if="minimalWebpPhoto"
        :srcset="`${photoUrl}/${photo.id}/${minimalWebpPhoto.name}`"
        type="image/webp"
      >
      <img
        v-if="minimalJpegPhoto"
        :src="`${photoUrl}/${photo.id}/${minimalJpegPhoto.name}`"
        :alt="alt"
        itemprop="image"
        loading="lazy"
        class="w-full h-full object-cover rounded-lg"
        @click="maximalJpegSrc && modalShowPhoto.open({ jpegSrc: maximalJpegSrc, webpSrc: maximalWebpSrc, alt })"
      >
    </picture>
    <div v-else class="h-full flex flex-col gap-2 items-center justify-center text-dimmed/50">
      <UIcon name="i-lucide-scaling" class="size-12" />
      <UIcon name="i-lucide-loader-2" class="size-6 motion-preset-spin motion-duration-2000" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PhotoWithData } from '@k39/database'
import ModalShowPhoto from '../modal/ShowPhoto.vue'

const { photo } = defineProps<{ photo: PhotoWithData, alt: string }>()

const { public: { photoUrl } } = useRuntimeConfig()

const jpegPhotos = computed(() => photo.versions.filter((version) => version.format === 'jpeg'))
const webpPhotos = computed(() => photo.versions.filter((version) => version.format === 'webp'))

const minimalJpegPhoto = computed(() => jpegPhotos.value.toSorted((a, b) => a.width - b.width)[0])
const minimalWebpPhoto = computed(() => webpPhotos.value.toSorted((a, b) => a.width - b.width)[0])

// For modal show
const maximalJpegPhoto = computed(() => jpegPhotos.value.toSorted((a, b) => b.width - a.width)[0])
const maximalWebpPhoto = computed(() => webpPhotos.value.toSorted((a, b) => b.width - a.width)[0])

const maximalJpegSrc = computed(() => maximalJpegPhoto.value ? `${photoUrl}/${photo.id}/${maximalJpegPhoto.value?.name}` : undefined)
const maximalWebpSrc = computed(() => maximalWebpPhoto.value ? `${photoUrl}/${photo.id}/${maximalWebpPhoto.value?.name}` : undefined)

const overlay = useOverlay()
const modalShowPhoto = overlay.create(ModalShowPhoto)
</script>
