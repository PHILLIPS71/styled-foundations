import type { Breakpoints, Theme } from '@/types'

const DEFAULT_BREAKPOINTS = ['768px', '1024px', '1216px', '1408px']

export const getBreakpoints = (theme?: Theme): Breakpoints => {
  if (theme == null) {
    return DEFAULT_BREAKPOINTS
  }

  const { breakpoints } = theme
  if (breakpoints == null) {
    return DEFAULT_BREAKPOINTS
  }

  if (Array.isArray(breakpoints)) {
    return breakpoints
  }

  return breakpoints
}

export const getBreakpoint = (value: string | number, breakpoints: Breakpoints): string | null => {
  switch (typeof value) {
    case 'number':
      if (!Array.isArray(breakpoints)) {
        return Object.keys(breakpoints)[value]
      }

      return breakpoints[value]
    case 'string':
      if (Array.isArray(breakpoints)) {
        console.error('You attempted to get a breakpoint by a named value where the theme has an array')
        return null
      }

      return breakpoints[value]
    default:
      return null
  }
}
