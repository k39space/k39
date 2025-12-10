<template>
  <UContainer class="max-w-5xl">
    <div class="mt-4 min-h-5">
      <UBreadcrumb
        v-if="items?.length"
        :items="items"
        :ui="{
          item: 'motion-preset-slide-up',
        }"
      />
    </div>
  </UContainer>

  <UPageHero
    orientation="vertical"
    :title="title"
    :description="description"
    :ui="{
      wrapper: 'lg:px-8',
      title: 'wrap-break-word',
      description: 'mx-auto max-w-4xl',
    }"
  />

  <UContainer class="max-w-xs md:max-w-2xl mb-36">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="contact in contacts"
        :key="contact.label"
        class="flex flex-row gap-4 items-center md:justify-center"
      >
        <UIcon :name="contact.icon" class="size-10 text-dimmed" />

        <div>
          <h3 class="font-bold text-muted">
            {{ contact.label }}
          </h3>
          <ULink
            :to="contact.to"
            target="_blank"
            class="font-semibold text-lg text-primary"
          >
            {{ contact.text }}
          </ULink>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const contacts = [
  {
    label: 'Email',
    icon: 'i-lucide-mail',
    text: 'nick@kosarev.space',
    to: 'mailto:nick@kosarev.space',
  },
  {
    label: 'Telegram',
    icon: 'simple-icons:telegram',
    text: 'hmbanan666',
    to: 'https://t.me/hmbanan666',
  },
]

const { items, setItems } = useBreadcrumb()

setItems([
  {
    label: 'Главная',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Контакты',
    icon: 'i-lucide-notebook-tabs',
    class: 'text-dimmed font-normal',
  },
])

const title = 'Контакты'
const description = 'Есть вопрос или предложение? Напишите автору проекта.'

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
