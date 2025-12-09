export type BackendError =
    | string
    | { msg: string; param: string; location: string }[]
    | null;