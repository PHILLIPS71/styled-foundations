import type { Breakpoints } from '@/theme/breakpoint'

export type Theme = {
  breakpoints?: Breakpoints
}

// eslint-disable-next-line import/prefer-default-export
export const getThemeValue = (path: string, value: string | number, theme?: any): string | number | null => {
  if (theme == null) {
    return null
  }

  let lookup = theme[path]
  const key = typeof value === 'string' ? value.split('.') : [value]
  for (let i = 0; i < key.length; i += 1) {
    if (lookup == null) {
      break
    }

    lookup = lookup[key[i] as keyof Theme]
  }

  if (lookup == null) {
    return value
  }

  return lookup
}
