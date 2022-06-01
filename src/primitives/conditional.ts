import type { GlobalParserConfig, GlobalParserFn } from '@/parser'

import { Parser } from '@/parser'

type ConditionalConfig = GlobalParserConfig & {
  success?: {
    [K in string]: Record<string, any>
  }
  failure?: {
    [K in string]: Record<string, any>
  }
}

const conditional = (options: ConditionalConfig) => {
  const parse: GlobalParserFn = (props) => {
    const keys = [...new Set([...Object.keys(options.success ?? []), ...Object.keys(options.failure ?? [])])]

    const styles = keys.reduce<Record<string, any>>((next, key) => {
      if (props?.[key] === true && typeof options.success?.[key] !== undefined)
        return { ...next, ...options.success?.[key] }

      if ((props?.[key] === undefined || props[key] === false) && typeof options.failure?.[key] !== undefined)
        return { ...next, ...options.failure?.[key] }

      return { ...next }
    }, {})

    return styles
  }

  const conditions = Array.isArray(options) ? options : [options]
  const parser = new Parser<Array<ConditionalConfig>>(conditions, parse)
  return parser.parse
}

export default conditional
