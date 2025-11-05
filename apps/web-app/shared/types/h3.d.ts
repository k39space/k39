import type { User } from '@k39/database'

declare module 'h3' {
  interface H3EventContext {
    user: User
  }
}
