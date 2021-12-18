import type { Theme } from '@/theme/theme'

import { getBreakpoints, getOrderedBreakpointValues } from '@/theme/breakpoint'

export type ParserConfig = {
  prop: string | Array<string>
}

type ParserFn = (index: number, value: any, theme?: Theme) => Record<string, any>

export class Parser<T extends ParserConfig | Array<ParserConfig>> {
  private readonly config: T

  private readonly parser: ParserFn

  constructor(config: T, parser: ParserFn) {
    this.config = config
    this.parser = parser
  }

  parse = (props: any) => {
    const styles: Array<Record<string, any>> = []

    if (Array.isArray(this.config)) {
      this.config.forEach((foundation, index) => {
        this.run(styles, foundation, index, props)
      })
    }

    return styles
  }

  run = (styles: Array<Record<string, any>>, config: ParserConfig, index: number, props: any) => {
    const { theme } = props
    const breakpoints = getBreakpoints(theme)

    // convert prop argument into an array so we can handle it all the same
    const inputs = Array.isArray(config.prop) ? config.prop : [config.prop]
    inputs.forEach((input) => {
      let values = props[input]

      if (values == null) {
        return
      }

      // append the styles directly where only a single value has been provided eg; my="20px"
      if (typeof values !== 'object') {
        const parsed = this.parser(index, values, theme)
        styles.push(parsed)
        return
      }

      // if the value is an object of breakpoints eg; my={{ sm: '0px', md: '10px', lg: '20px', xl: '30px' }} turn values into an array
      if (!Array.isArray(values)) {
        // sort the values in the array by the breakpoint sizes
        const ordered = getOrderedBreakpointValues(values, theme)
        values = Object.values(ordered)
      }

      // the value should be now an array of breakpoints eg; ['0px', '10px', '20px', '30px']
      if (Array.isArray(values)) {
        values.forEach((value, breakpointIndex) => {
          const parsed = this.parser(index, value, theme)

          // check if a extra value has been provided to add a value for no media query option
          const isSupplyingZeroBreakpoint = values.length === Object.keys(breakpoints).length + 1
          const idx = isSupplyingZeroBreakpoint ? breakpointIndex - 1 : breakpointIndex

          // add styles with no media query where exactly 1 extra breakpoint has been provided
          if (breakpointIndex === 0) {
            if (isSupplyingZeroBreakpoint) {
              styles.push({ ...parsed })
              return
            }
          }

          // do not process any undefined breakpoints
          if (breakpoints[idx] === undefined) {
            const totalBreakpoints = Object.keys(breakpoints).length
            console.warn(
              `${input} prop provided ${values.length} breakpoints but only ${totalBreakpoints} exist in the theme.`
            )
            return
          }

          styles.push({
            [`@media screen and (min-width: ${breakpoints[idx]})`]: {
              ...parsed,
            },
          })
        })
      }
    })
  }
}
