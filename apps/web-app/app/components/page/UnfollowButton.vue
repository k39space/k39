<template>
  <UButton
    size="lg"
    color="neutral"
    variant="soft"
    block
    :icon="followerButtonIcon"
    :label="followerButtonLabel"
    :loading="isSubmitting"
    :disabled="isSubmitting"
    @mouseenter="handleFollowerButtonHover(true)"
    @mouseleave="handleFollowerButtonHover(false)"
    @click="modalDeletePageFollower.open({ pageId, onSuccess: () => { modalDeletePageFollower.close(); onSuccess() }, onClose: modalDeletePageFollower.close })"
  />
</template>

<script setup lang="ts">
import ModalDeletePageFollower from '../modal/DeletePageFollower.vue'

defineProps<{ pageId: string, onSuccess: () => void }>()

const isSubmitting = ref(false)
const followerButtonLabel = ref('Вы подписаны')
const followerButtonIcon = ref('i-lucide-user-round-check')

function handleFollowerButtonHover(isHovered: boolean) {
  if (isHovered) {
    followerButtonLabel.value = 'Отписаться'
    followerButtonIcon.value = 'i-lucide-user-round-x'
  } else {
    followerButtonLabel.value = 'Вы подписаны'
    followerButtonIcon.value = 'i-lucide-user-round-check'
  }
}

const overlay = useOverlay()
const modalDeletePageFollower = overlay.create(ModalDeletePageFollower)
</script>
