export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/sign-in')
  }

  // Redirect to profile page
  if (to.path === '/me') {
    const { data: user } = await useFetch('/api/auth/me')

    if (user.value?.username) {
      return navigateTo(`/u/${user.value?.username}`)
    }

    return navigateTo('/')
  }
})
