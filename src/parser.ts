import type { CSSObject, Responsive, ResponsiveValue } from '@/types'

import { getBreakpoints } from '@/theme/breakpoint'
import { getTheme } from '@/theme/theme'

class Parser<S = CSSObject> {
  private parser: (value: ResponsiveValue, props: Record<string, unknown>) => Responsive<CSSObject>

  private prop: string

  constructor(parser: (value: ResponsiveValue, props: Record<string, unknown>) => Responsive<CSSObject>, prop: string) {
    this.parser = parser
    this.prop = prop
  }

  parse = (props: Record<string, unknown>): S => {
    const styles: Array<CSSObject | string> = []
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
      let style: CSSObject | string = parsed[index]

      // styled-components css utility function outputs styles as an array with the css string
      if (Array.isArray(style)) {
        if (typeof style[0] === 'string') {
          const css = style[0]
          style = css.trim()
        }
      }

      if (breakpoint) {
        if (typeof style === 'string') {
          styles.push(`@media screen and (min-width: ${breakpoint}) { ${style} }`)
        }

        if (typeof style === 'object') {
          styles.push({
            [`@media screen and (min-width: ${breakpoint})`]: {
              ...style,
            },
          })
        }
      }

      // append first parsed value as a base since no styles will apply less than the size of first breakpoint
      if (index === 0) {
        styles.push(style)
      }
    }

    return styles as unknown as S
  }
}

export default Parser
