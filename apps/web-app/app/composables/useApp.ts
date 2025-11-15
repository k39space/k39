function _useApp() {
  const route = useRoute()

  const isMobileMenuOpened = ref(false)

  const mainNavigationItems = computed(() => [
    {
      label: 'Адвент-календарь',
      to: '/advent-calendar',
      icon: 'fluent-emoji-flat:snowflake',
      active: route.path.startsWith('/advent-calendar'),
    },
    {
      label: 'Пример страницы',
      to: '/muza',
      active: route.path.startsWith('/muza'),
    },
    {
      label: 'Пример пользователя',
      to: '/u/c2z0rqydtcgirpbmri713izd',
      active: route.path.startsWith('/u'),
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
