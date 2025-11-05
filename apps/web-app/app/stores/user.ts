export const useUserStore = defineStore('user', () => {
  const id = ref<string | undefined>(undefined)
  const onlineAt = ref<string | undefined>(undefined)
  const avatarUrl = ref<string | undefined>(undefined)
  const username = ref<string | undefined>(undefined)

  const { idle } = useIdle(30_000) // 30 sec

  async function update() {
    try {
      const data = await $fetch('/api/auth/me')
      if (!data) {
        return
      }

      id.value = data.id
      onlineAt.value = data.onlineAt
      avatarUrl.value = data.avatarUrl ?? undefined
      username.value = data.username
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No session
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  async function updateOnline() {
    try {
      if (!id.value || idle.value) {
        return
      }

      await $fetch(`/api/auth/me/online`, {
        method: 'POST',
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          // No session
        }
        if (error.message.includes('404')) {
          // Not found
        }
      }
    }
  }

  return {
    id,
    onlineAt,
    avatarUrl,
    username,

    update,
    updateOnline,
  }
})
