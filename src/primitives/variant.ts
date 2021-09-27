import type { CSSObject, Responsive, ResponsiveValue } from '@/types'

import Parser from '@/parser'

type VariantArgs<TVariant extends string> = {
  prop?: string
  variants: {
    [K in TVariant]: Responsive<CSSObject> | CSSObject
  }
}

const variant = <TVariant extends string, TStyle = CSSObject>(args: VariantArgs<TVariant>) => {
  const parse = (value: ResponsiveValue): Responsive<CSSObject> => {
    if (typeof value !== 'string' || !Object.keys(args.variants).includes(value)) {
      console.error(`Invalid variant provided ${value} was expecting one of ${Object.keys(args.variants).join(', ')}`)
      return []
    }

    const used = args.variants[value as TVariant]
    if (Array.isArray(used)) {
      return used
    }

    const values: Responsive<CSSObject> = []
    Object.keys(used).forEach((breakpoint) => {
      // @ts-ignore
      values.push(used[breakpoint])
    })

    return values
  }

  const parser = new Parser<TStyle>(parse, args.prop || 'variant')
  return parser.parse
}

export default variant
