<template>
  <UPageHero
    orientation="vertical"
    :title="title"
    :description="description"
    :ui="{
      wrapper: 'lg:px-8',
      title: 'wrap-break-word',
      description: 'mx-auto max-w-4xl',
    }"
  >
    <template #headline>
      <UBadge color="neutral" variant="soft">
        Открытый код
      </UBadge>
    </template>
  </UPageHero>
</template>

<script setup lang="ts">
const title = 'Калининград онлайн: заведения, блоги и отзывы жителей области'
const description = 'Найдите лучшие места Калининграда и области, читайте отзывы и публикуйте свои. Создавайте блог, делитесь постами и будьте в курсе событий региона. Всё о жизни в Калининграде.'

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
