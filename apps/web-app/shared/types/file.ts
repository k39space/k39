import type { Buffer } from 'node:buffer'
import type { Metadata } from 'sharp'

export type FileLike = {
  data: Buffer
  name?: string
  filename?: string
  type?: string
}

export type OriginalPhoto = FileLike & { id: string, metadata: Metadata }
