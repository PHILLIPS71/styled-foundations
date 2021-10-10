import type { CSSObject, Responsive, ResponsiveValue } from '@/types'

import Parser from '@/parser'

type ResponsiveArgs<V extends string> = {
  prop?: string
  breakpoints:
    | Array<CSSObject>
    | {
        [K in V]: CSSObject
      }
}

const responsive = <V extends string, S = any>(args: ResponsiveArgs<V>) => {
  const parse = (value: ResponsiveValue): Responsive<CSSObject> => {
    if (Array.isArray(args.breakpoints)) {
      if (typeof value === 'number') {
        return [(args.breakpoints as Array<CSSObject>)[value]]
      }

      if (typeof value === 'string') {
        console.error(`Invalid breakpoint provided ${value} was expecting a number`)
        return []
      }

      return args.breakpoints
    }

    if (typeof value === 'number') {
      return [Object.values(args.breakpoints)[value] as CSSObject]
    }

    return [args.breakpoints[value as V]]
  }

  const parser = new Parser<S>(parse, args.prop || 'breakpoint')
  return parser.parse
}

export default responsive
