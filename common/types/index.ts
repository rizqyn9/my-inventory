declare global {
  type ObjUnknown = Record<string, unknown>

  type WithId<T extends ObjUnknown> = T & {
    id: string
  }
}

export {}
