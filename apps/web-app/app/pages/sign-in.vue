<template>
  <div class="w-full h-screen mx-auto grid grid-cols-1 lg:grid-cols-2">
    <div
      class="relative hidden lg:block bg-cover"
      style="background-image: url('/img/bg-pattern-1.jpg')"
    >
      <div class="absolute top-4 right-0">
        <div class="-mr-4 py-3 pl-4 pr-8 w-fit bg-default rounded-md">
          <Logo />
        </div>
      </div>

      <div class="absolute bottom-4 left-4 right-4">
        <div class="py-4 px-4 max-w-lg bg-default rounded-md flex flex-row gap-4">
          <img
            :src="quote.authorImage"
            :alt="quote.author"
            class="size-18 rounded-full"
          >

          <div class="flex flex-col gap-2">
            <h3 class="text-lg/6 font-semibold">
              &quot;{{ quote.text }}&quot;
            </h3>

            <p class="text-sm/5 text-muted">
              &mdash; {{ quote.author }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="my-4 flex flex-col justify-between items-center">
      <div class="flex grow flex-col justify-center items-center">
        <UContainer class="md:min-w-sm">
          <h1 class="mb-10 text-2xl/6 font-bold text-center">
            Мы вас заждались!
          </h1>

          <div class="flex flex-col gap-2">
            <UButton
              v-for="provider in providers"
              :key="provider.name"
              :to="`/api/auth/provider?provider=${provider.name}&redirectTo=${encodeURIComponent(redirectTo)}`"
              :icon="provider.icon"
              :label="provider.label"
              size="xl"
              external
              block
            />
          </div>
        </UContainer>
      </div>

      <UButton
        to="/"
        variant="link"
        icon="i-lucide-undo-2"
      >
        Вернуться
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: ['02-guest-only'],
})

const route = useRoute()
const redirectTo = computed(() => route.query.redirectTo as string ?? '/')

useHead({
  title: 'Войти как пользователь',
})

const providers = ref([
  {
    name: 'yandex',
    icon: 'i-simple-icons:yandexcloud',
    label: 'Войти через Яндекс',
  },
  {
    name: 'vk',
    icon: 'i-simple-icons:vk',
    label: 'Войти через ВКонтакте',
  },
  {
    name: 'github',
    icon: 'i-simple-icons:github',
    label: 'Войти через GitHub',
  },
  {
    name: 'twitch',
    icon: 'i-simple-icons:twitch',
    label: 'Войти через Twitch',
  },
])

const quote = {
  text: 'Такой город, как Кенигсберг на Прегеле, можно признать подходящим местом для расширения знания и человека, и света. Здесь и без путешествия можно приобрести такое знание.',
  author: 'Иммануил Кант, немецкий философ',
  authorImage: '/img/famous/immanuel-kant.jpg',
}
</script>
