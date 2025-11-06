<template>
  <div class="max-w-28 flex flex-col gap-3 justify-start items-center">
    <div class="relative group ring-2 ring-default rounded-lg">
      <img :src="badge.src" class="group-hover:hidden p-3 bg-white size-20 rounded-lg">
      <img :src="badge.srcGif" class="hidden group-hover:block size-20 rounded-lg">

      <div v-if="level" class="absolute bottom-0 right-0">
        <div class="mx-auto w-8 h-5 flex flex-row items-center justify-center bg-neutral-200 rounded-tl-lg rounded-br-lg">
          <p class="text-lg text-neutral-900 font-semibold">
            {{ level }}
          </p>
        </div>
      </div>
    </div>

    <h4 class="text-base/4 font-semibold text-center">
      {{ badge.title }}
    </h4>
  </div>
</template>

<script setup lang="ts">
type BadgeType = 'expert_of_region' | 'author' | 'likes_collector'

const { type } = defineProps<{ type: BadgeType, level: number }>()

const badge = computed(() => getBadgeByType(type))

function getBadgeByType(type: BadgeType) {
  switch (type) {
    case 'expert_of_region':
      return {
        src: '/img/badge/badge1.png',
        srcGif: '/img/badge/badge1.gif',
        title: 'Знаток области',
      }
    case 'author':
      return {
        src: '/img/badge/badge2.png',
        srcGif: '/img/badge/badge2.gif',
        title: 'Автор',
      }
    case 'likes_collector':
      return {
        src: '/img/badge/badge3.png',
        srcGif: '/img/badge/badge3.gif',
        title: 'Коллекционер лайков',
      }
  }
}
</script>
