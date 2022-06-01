import type { Theme } from '@/theme/theme'

import { getBreakpoints, getOrderedBreakpointValues } from '@/theme/breakpoint'

export type ParserFn = (index: number, value: any, theme?: Theme) => Record<string, any>
export type ParserConfig = {
  prop: string | Array<string>
}

export type GlobalParserFn = (props: Record<string, any>, theme: Theme | null) => Record<string, any>
export type GlobalParserConfig = {}

export class Parser<T extends ParserConfig | Array<ParserConfig> | GlobalParserConfig> {
  private readonly config: T

  private readonly parser: ParserFn | GlobalParserFn

  constructor(config: T, parser: ParserFn | GlobalParserFn) {
    this.config = config
    this.parser = parser
  }

  parse = (props: any) => {
    const styles: Array<Record<string, any>> = []

    // a global parser does not need to be put thought the run function since no input prop is required
    if (this.isGlobalParser()) {
      const parser = this.parser as GlobalParserFn
      return parser(props, props.theme)
    }

    if (Array.isArray(this.config)) {
      this.config.forEach((config, index) => {
        this.run(styles, config, index, props)
      })
    }

    return styles
  }

  private isGlobalParser = () => {
    if (Array.isArray(this.config)) {
      return typeof this.config[0].prop === 'undefined'
    }

    return typeof (this.config as ParserConfig).prop === 'undefined'
  }

  /**
   * Runs over a {@link ParserConfig} to return a single style object, if multiple runs are required
   * where an array of {@link ParserConfig} has been passed into the {@link Parser}, the styles object should
   * be passed though again.
   *
   * It will handle generating of responsive styles retrieved from the input prop set in the
   * {@link ParserConfig}, where the bellow syntax of breakpoints will then be converted into media
   * queries using the themes pre-defined breakpoints object in the {@link Theme}.
   *
   * #### Supported Breakpoint Syntax:
   * my would be the prop set in the {@link ParserConfig.prop}
   * ```
   *  my={['0px', '10px', '20px', '30px']}
   *  my={{ sm: '0px', md: '10px', lg: '20px', xl: '30px' }}
   * ```

   * @param styles The object to append the generated styles
   * @param config Options to reference when building the styles
   * @param index  The position in the array where multiple runs are required
   * @param props Inputs that are in the jsx element to get common values from (eg; theme)
   */
  private run = (styles: Array<Record<string, any>>, config: ParserConfig, index: number, props: any) => {
    const { theme } = props
    const breakpoints = getBreakpoints(theme)
    const parser = this.parser as ParserFn

    // convert prop argument into an array so we can handle it all the same
    const inputs = Array.isArray(config.prop) ? config.prop : [config.prop]
    inputs.forEach((input) => {
      let values = props[input]

      if (values == null) {
        return
      }

      // append the styles directly where only a single value has been provided eg; my="20px"
      if (typeof values !== 'object') {
        const parsed = parser(index, values, theme)
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
          const parsed = parser(index, value, theme)

          // check if a extra value has been provided to add a value for no media query option
          const isSupplyingZeroBreakpoint = values.length === Object.keys(breakpoints).length + 1
          const idx = isSupplyingZeroBreakpoint ? breakpointIndex - 1 : breakpointIndex

          // add styles with no media query on the first breakpoint index
          if (breakpointIndex === 0) {
            styles.push({ ...parsed })
            return
          }

          // do not process any undefined breakpoints
          if (breakpoints[idx] === undefined) {
            console.warn(
              `${input} prop gave ${values.length} breakpoints but ${
                Object.keys(breakpoints).length
              } exist in the theme.`
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
