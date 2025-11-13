export function isApiError(error: unknown): error is ApiError {
  if (!error || typeof error !== 'object') {
    return false
  }

  if (!('data' in error)) {
    return false
  }

  const data = (error as any).data

  if (!data || typeof data !== 'object') {
    return false
  }

  const dataInData = (data as any).data

  if (!dataInData || typeof dataInData !== 'object') {
    return false
  }

  if (!('code' in dataInData)) {
    return false
  }

  const code = (dataInData as any).code
  return typeof code === 'string' && code.trim().length > 0
}

interface ApiError {
  data: {
    data: ApiErrorData
  }
}

interface ApiErrorData {
  code: string
  message: string
  details?: Record<string, any>
  timestamp?: string
}
