import type { Properties, Pseudos } from 'csstype'

export type CSSProperties = Properties<string | number>
export type CSSPseudos = { [K in Pseudos]?: CSSObject }
export type CSSObject = CSSProperties & CSSPseudos & { [key: string]: CSSObject | string | number | undefined }

export type Responsive<T> = Array<T>
export type ResponsiveValue = Array<string | number> | Record<string, string | number> | string | number

export type Breakpoints = Record<string, string> | Array<string>
export type Theme = { [T in keyof CSSProperties]?: string | number } & {
  breakpoints?: Breakpoints
}

// https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object/58436959#58436959
type Prev = [never, 0, 1, 2, 3, 4, ...0[]]

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never

export type Paths<T, D extends number = 4> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never
    }[keyof T]
  : ''
