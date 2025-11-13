<template>
  <USeparator icon="i-lucide-waves" class="mt-16" />

  <div class="py-8 lg:py-12 border-b border-default">
    <UContainer>
      <nav class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="flex flex-col lg:grid grid-flow-col auto-cols-fr gap-12 md:gap-8 xl:col-span-2">
          <div v-for="column in columns" :key="column.label">
            <h3 class="text-sm font-semibold">
              {{ column.label }}
            </h3>
            <ul class="mt-6 space-y-4">
              <li
                v-for="item in column.children"
                :key="item.label"
                class="relative"
              >
                <ULink
                  :to="item.to"
                  :target="item.target"
                  class="text-base"
                >
                  {{ item.label }}
                </ULink>

                <p v-if="item?.description" class="text-xs text-muted">
                  {{ item.description }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </UContainer>
  </div>

  <UFooter class="mt-4 mb-8">
    <template #left>
      <div class="flex flex-col gap-1 items-center lg:items-start text-muted">
        <p class="flex flex-row items-center gap-1">
          Создается с <UIcon name="fluent-emoji-flat:red-heart" class="size-5" /> и с <UIcon name="fluent-emoji-flat:fire" class="size-5" /> в глазах
        </p>
        <div class="text-sm">
          © 2025, ИП Косарев Н.Н.
        </div>
      </div>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeSelect />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { app } = useAppConfig()

const items: NavigationMenuItem[] = [
  {
    label: 'GitHub проекта',
    to: app.githubUrl,
    target: '_blank',
    icon: 'i-simple-icons:github',
  },
]

const columns: { label: string, children: NavigationMenuItem[] }[] = [{
  label: 'Юридическая информация',
  children: [
    {
      label: 'Политика конфиденциальности',
      to: '/legal/privacy-policy',
    },
  ],
}]
</script>
