import type { UserDraft } from '../../types'
import { describe, expect, it } from 'vitest'
import { User } from '../user'

describe('user', () => {
  it('should create and return a user', async () => {
    const mockUser: UserDraft = {
      email: 'test@example.com',
      name: 'Test User',
      username: 'test',
    }

    const createdUser = await User.create(mockUser)

    expect(createdUser).toHaveProperty('id')
    expect(createdUser.email).toBe(mockUser.email)
    expect(createdUser.username).toBe(mockUser.username)
    expect(createdUser.createdAt).toBeDefined()
  })
})
