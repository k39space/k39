<template>
  <UModal
    title="Делитесь своими впечатлениями"
    :ui="{
      content: 'max-w-md',
    }"
  >
    <template #body>
      <div class="flex flex-col gap-6">
        <UIcon name="fluent-emoji-flat:black-nib" class="size-18 mx-auto" />

        <div class="flex flex-col gap-2">
          <p>
            Пожалуйста, соблюдайте несколько простых правил:
          </p>

          <ul class="list-disc list-inside">
            <li>
              избегайте ненормативной лексики и оскорблений
            </li>
            <li>
              не указывайте личные данные (свои или чужие)
            </li>
            <li>
              сосредоточьтесь на оценке бизнеса, а не на обсуждении цен или сторонних тем
            </li>
          </ul>
        </div>

        <p class="text-muted">
          Отзывы по обслуживанию и сервису следует оставлять путем обратной связи по указанным контактам на странице.
        </p>
      </div>

      <UButton
        variant="solid"
        color="primary"
        size="xl"
        block
        class="mt-5"
        label="Понятно"
        @click="onClick()"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{ onClick: () => void }>()
</script>
