<template>
  <UPageHero
    orientation="vertical"
    :title="title"
    :description="description"
    :ui="{
      container: 'lg:pb-18',
      wrapper: 'lg:px-8',
      title: 'wrap-break-word',
      description: 'mx-auto max-w-4xl',
    }"
  >
    <template #headline>
      <div class="group w-fit mx-auto">
        <UBadge
          size="lg"
          color="neutral"
          variant="soft"
          :ui="{
            base: 'px-4',
          }"
          class="group-hover:hidden"
        >
          Уже совсем скоро! 🎉
        </UBadge>
      </div>
    </template>
  </UPageHero>

  <UContainer class="max-w-5xl">
    <AdventMobileCalendar v-if="isMobile" />
    <AdventDesktopCalendar v-else />
  </UContainer>

  <UContainer class="mt-12 max-w-3xl">
    <img
      src="/img/advent/santa-claus-256.gif"
      alt="Санта"
      class="size-28 rounded-xl"
    >
    <p class="italic">
      Этот адвент‑календарь поможет вам создать праздничное настроение шаг за шагом. Каждый день — новое задание, идея или маленький подарок, который сделает декабрь особенным.
    </p>
  </UContainer>

  <UContainer class="mt-20 max-w-3xl">
    <AdventUserContentBlock />
  </UContainer>
  <AdventUserContentLine />

  <UContainer class="mt-20 max-w-3xl">
    <AdventStoryBlock />
  </UContainer>

  <UContainer class="mt-20 max-w-3xl">
    <img
      src="/img/advent/christmas-tree-256.gif"
      alt="Елка"
      class="ml-auto size-28 rounded-xl"
    >
    <AdventQuestionsBlock />
  </UContainer>
</template>

<script setup lang="ts">
const title = 'От декабря к Новому году: адвент‑календарь 2025→2026'
const description = '31 день предвкушения праздника: ежедневный адвент‑календарь с заданиями, сюрпризами и вдохновением. Проведите декабрь осознанно — от первого дня до новогодней ночи!'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 600)

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
})
</script>
