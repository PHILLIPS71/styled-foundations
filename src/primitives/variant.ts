import type { CSSObject, Responsive, ResponsiveValue } from '@/types'

import Parser from '@/parser'
import { getOrderedBreakpointStyles } from '@/theme/breakpoint'
import { getTheme } from '@/theme/theme'

type VariantArgs<TVariant extends string> = {
  prop?: string
  variants: {
    [K in TVariant]: Responsive<CSSObject> | CSSObject
  }
}

const variant = <TVariant extends string, TStyle = CSSObject>(args: VariantArgs<TVariant>) => {
  const parse = (value: ResponsiveValue, props: Record<string, unknown>): Responsive<CSSObject> => {
    if (typeof value !== 'string' || !Object.keys(args.variants).includes(value)) {
      console.error(`Invalid variant provided ${value} was expecting one of ${Object.keys(args.variants).join(', ')}`)
      return []
    }

    const theme = getTheme(props)
    const used = args.variants[value as TVariant]
    if (Array.isArray(used)) {
      return used
    }

    const values: Responsive<CSSObject> = []
    const ordered = getOrderedBreakpointStyles(used, theme)

    Object.keys(ordered).forEach((breakpoint) => {
      values.push(ordered[breakpoint] as CSSObject)
    })

    return values
  }

  const parser = new Parser<TStyle>(parse, args.prop || 'variant')
  return parser.parse
}

export default variant
