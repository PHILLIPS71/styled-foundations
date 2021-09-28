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

export const getOrderedBreakpoints = (breakpoints: Breakpoints): Breakpoints => {
  if (Array.isArray(breakpoints)) {
    return breakpoints.sort()
  }

  return Object.entries(breakpoints)
    .sort((a, b) => parseInt(a[1], 10) - parseInt(b[1], 10))
    .reduce(
      (sorted, [k, v]) => ({
        ...sorted,
        [k]: v,
      }),
      {}
    )
}

export const getOrderedBreakpointStyles = (value: Record<string, unknown>, theme?: Theme): Record<string, unknown> => {
  const breakpoints = getOrderedBreakpoints(getBreakpoints(theme))

  const keys = Object.keys(breakpoints)
  return Object.entries(value)
    .sort((a, b) => keys.indexOf(a[0]) - keys.indexOf(b[0]))
    .reduce(
      (sorted, [k, v]) => ({
        ...sorted,
        [k]: v,
      }),
      {}
    )
}
