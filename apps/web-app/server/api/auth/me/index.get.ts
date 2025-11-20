export default defineEventHandler(async (event) => {
  try {
    return getUserFromSession(event)
  } catch (error) {
    throw errorResolver(error)
  }
})
