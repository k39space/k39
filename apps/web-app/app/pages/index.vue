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
          Открытый код
        </UBadge>
        <UBadge
          size="lg"
          color="neutral"
          variant="soft"
          trailing-icon="fluent-emoji-flat:cat-face"
          :ui="{
            base: 'px-4 font-semibold',
            trailingIcon: 'size-5',
          }"
          class="hidden group-hover:inline-flex cursor-pointer"
          @click="openGithub()"
        >
          Открытый кот
        </UBadge>
      </div>
    </template>
  </UPageHero>
</template>

<script setup lang="ts">
const { app } = useAppConfig()

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

function openGithub() {
  window.open(app.githubUrl, '_blank')
}
</script>
