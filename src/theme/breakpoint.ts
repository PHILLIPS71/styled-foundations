import type { Theme } from '@/theme/theme'

export type Breakpoints = Record<string | number, string>

let CACHED_BREAKPOINTS: Breakpoints | null = null

let CACHED_RAW_BREAKPOINTS_OBJECT: Record<string, string> | null = null

const DEFAULT_BREAKPOINTS = ['768px', '1024px', '1216px', '1408px'].reduce<Breakpoints>((acc, cur, index) => {
  acc[index] = cur
  return acc
}, {})

const getUncachedBreakpoints = (theme?: Theme): Breakpoints => {
  if (theme == null) {
    return DEFAULT_BREAKPOINTS
  }

  const { breakpoints } = theme
  if (breakpoints == null) {
    return DEFAULT_BREAKPOINTS
  }

  if (Array.isArray(breakpoints)) {
    return breakpoints
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .reduce<Breakpoints>((acc, cur, index) => {
        acc[index] = cur
        return acc
      }, {})
  }

  if (typeof breakpoints === 'object') {
    // store the ordered raw state of the breakpoints using their existing keys as this is required to compare with incoming values
    CACHED_RAW_BREAKPOINTS_OBJECT = Object.entries(breakpoints)
      .sort((a, b) => parseInt(a[1], 10) - parseInt(b[1], 10))
      .reduce<Breakpoints>(
        (sorted, [key, value]) => ({
          ...sorted,
          [key]: value,
        }),
        {}
      )

    // return the breakpoints using the index as the key so we match the same key value pattern produce when an array is provided instead
    return Object.entries(CACHED_RAW_BREAKPOINTS_OBJECT).reduce<Breakpoints>(
      (sorted, [, value], index) => ({
        ...sorted,
        [index]: value,
      }),
      {}
    )
  }

  return breakpoints
}

export const getBreakpoints = (theme?: Theme): Breakpoints => {
  if (CACHED_BREAKPOINTS !== null) {
    return CACHED_BREAKPOINTS
  }

  CACHED_BREAKPOINTS = getUncachedBreakpoints(theme)
  return CACHED_BREAKPOINTS
}

export const getOrderedBreakpointValues = (value: Record<string, unknown>, theme?: Theme): Record<string, unknown> => {
  if (CACHED_RAW_BREAKPOINTS_OBJECT == null) {
    getBreakpoints(theme)

    if (CACHED_RAW_BREAKPOINTS_OBJECT == null) {
      throw new Error('A breakpoint of type object is null and was not found in the theme.')
    }
  }

  const keys = Object.keys(CACHED_RAW_BREAKPOINTS_OBJECT)
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
