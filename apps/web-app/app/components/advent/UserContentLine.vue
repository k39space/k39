<template>
  <div class="mt-8 w-full">
    <UMarquee
      pause-on-hover
      :overlay="false"
      :ui="{
        root: '[--gap:--spacing(4)] [--duration:60s]',
        content: 'w-auto py-1',
      }"
    >
      <UPageCard
        v-for="(post, index) in posts"
        :key="index"
        variant="subtle"
        spotlight
        spotlight-color="neutral"
        :ui="{
          container: 'p-3.5!',
        }"
        class="w-64 shrink-0"
      >
        <template #default>
          <div class="w-full h-auto aspect-square flex flex-col justify-center items-center ring ring-default bg-neutral-100 rounded-lg">
            <UIcon name="i-lucide-image" class="size-10 text-muted/25" />
          </div>
        </template>
        <template #body>
          <UUser
            v-bind="post.user"
            size="xl"
            :ui="{ description: 'line-clamp-1' }"
          />
        </template>
      </UPageCard>
    </UMarquee>
  </div>
</template>

<script setup lang="ts">
const posts = ref([
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/1245343.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/1245346735.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/12453435.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/13245343.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/12453343.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/12245343.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/124545343.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/12425343.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/112245343.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/12453463.svg',
        alt: '???',
      },
    },
  },
  {
    user: {
      name: '???',
      avatar: {
        src: 'https://avatar.k39.online/123245343.svg',
        alt: '???',
      },
    },
  },
])
</script>
