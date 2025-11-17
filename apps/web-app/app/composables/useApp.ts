function _useApp() {
  const route = useRoute()

  const isMobileMenuOpened = ref(false)

  const mainNavigationItems = computed(() => [
    {
      label: 'Адвент-календарь 2025→2026',
      to: '/advent-calendar',
      icon: 'fluent-emoji-flat:snowflake',
      active: route.path.startsWith('/advent-calendar'),
    },
  ])

  watch(
    () => route.fullPath,
    () => {
      isMobileMenuOpened.value = false
    },
  )

  return {
    isMobileMenuOpened,
    mainNavigationItems,
  }
}

export const useApp = createSharedComposable(_useApp)
