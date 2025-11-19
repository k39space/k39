import { useDatabase } from '../database'
import { Badge } from './badge'
import { Page } from './page'
import { PageReview } from './pageReview'
import { Photo } from './photo'
import { User } from './user'

class Repository {
  readonly badge = Badge
  readonly page = Page
  readonly pageReview = PageReview
  readonly photo = Photo
  readonly user = User

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.users.findFirst()
    return true
  }
}

export const repository = new Repository()
