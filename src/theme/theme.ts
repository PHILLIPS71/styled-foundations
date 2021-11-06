import type { Theme } from '@/types'

export const getTheme = (props: any): Theme | undefined => {
  if (props.theme) {
    return props.theme as Theme
  }

  return undefined
}

export function getThemeValue<T = unknown>(theme: Theme, path: string | number, fallback?: T): T {
  const key = typeof path === 'string' ? path.split('.') : [path]

  let value: any = theme
  for (let i = 0; i < key.length; i += 1) {
    if (!value) {
      break
    }

    value = value[key[i]]
  }

  if (value === undefined && fallback) {
    return fallback
  }

  return value
}
