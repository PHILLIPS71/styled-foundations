import type { CSSObject, Responsive, ResponsiveValue } from '@/types'

import { getBreakpoints } from '@/theme/breakpoint'
import { getTheme } from '@/theme/theme'

class Parser<T = CSSObject> {
  private parser: (value: ResponsiveValue, props: Record<string, unknown>) => Responsive<CSSObject>

  private prop: string

  constructor(parser: (value: ResponsiveValue, props: Record<string, unknown>) => Responsive<CSSObject>, prop: string) {
    this.parser = parser
    this.prop = prop
  }

  parse = (props: Record<string, unknown>): T => {
    const styles: Array<CSSObject> = []
    const value = props[this.prop] as string
    const parsed = this.parser(value, props)
    const theme = getTheme(props)
    let breakpoints = getBreakpoints(theme)

    // parse responsive values array into the styles object
    if (!Array.isArray(breakpoints)) {
      breakpoints = Object.values(breakpoints)
    }

    if (parsed.length > breakpoints.length) {
      console.warn(
        `${this.prop} responsive value provided ${parsed.length} breakpoints but only ${breakpoints.length} exist in the theme`
      )
    }

    // create a media query for each style object in the array by the breakpoint found at that index
    for (let index = 0; index < parsed.length; index += 1) {
      const breakpoint = breakpoints[index]
      const style = parsed[index]


      if (breakpoint) {
        styles.push({
          [`@media screen and (min-width: ${breakpoint})`]: {
            ...style,
          },
        })
      }
    }

    // append first parsed value as a base since no styles will apply less than the size of first breakpoint
    styles.push(parsed[0])
    console.warn('STYLES', styles)
    return styles as unknown as T
  }
}

export default Parser
