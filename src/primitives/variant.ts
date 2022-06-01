import type { ParserConfig, ParserFn } from '@/parser'

import { Parser } from '@/parser'

type VariantConfig<V extends string | number> = ParserConfig & {
  variants: {
    [K in V]: Record<string, any>
  }
}

const variant = <V extends string | number>(options: VariantConfig<V> | Array<VariantConfig<V>>) => {
  const parse: ParserFn = (index, value) => {
    const variants = Array.isArray(options) ? options[index].variants : options.variants

    if (!Object.keys(variants).includes(value.toString())) {
      console.warn(`Invalid variant provided ${value} was expecting one of ${Object.keys(variants).join(', ')}`)
    }

    return variants[value as keyof typeof variants]
  }

  const variants = Array.isArray(options) ? options : [options]
  const parser = new Parser<Array<VariantConfig<V>>>(variants, parse)
  return parser.parse
}

export default variant
