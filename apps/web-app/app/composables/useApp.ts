function _useApp() {
  const route = useRoute()

  const isMobileMenuOpened = ref(false)

  const mainNavigationItems = computed(() => [{
    label: 'Пример страницы',
    to: '/muza',
    active: route.path.startsWith('/muza'),
  }, {
    label: 'Пример пользователя',
    to: '/u/hmbanan666',
    active: route.path.startsWith('/u'),
  }])

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
