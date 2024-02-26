declare global {
  type ObjUnknown = Record<string, unknown>

  type WithId<T extends ObjUnknown> = T & {
    id: string
  }
}

declare module "@material-tailwind/react" {}

export {}
