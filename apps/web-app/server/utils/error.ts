import { H3Error } from 'h3'
import { ZodError } from 'zod'

const logger = useLogger('error')

export function errorResolver(exception: unknown) {
  if (exception instanceof H3Error) {
    throw exception
  }

  if (exception instanceof ZodError) {
    return createError({
      statusCode: 400,
      statusMessage: exception.message,
    })
  }

  // Ok, something interesting happened
  logger.error(exception)

  return createError({
    statusCode: 500,
    statusMessage: 'Internal server error',
  })
}
