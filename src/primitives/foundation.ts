import type { ParserConfig } from '@/parser'
import type { Theme } from '@/theme/theme'
import type { CSSProperties, Paths } from '@/types'

import { Parser } from '@/parser'
import { getThemeValue } from '@/theme/theme'

type FoundationProperty<T> = {
  theme: Paths<T>
  fallback?: string | number
}

export type FoundationConfig<T> = ParserConfig & {
  properties: {
    [K in keyof CSSProperties]?: FoundationProperty<T> | boolean
  }
}

const foundation = <T>(options: FoundationConfig<T> | Array<FoundationConfig<T>>) => {
  const parse = (index: number, value: any, theme?: Theme): Record<string, any> => {
    const styles: Record<string, any> = {}

    const properties = Array.isArray(options) ? options[index].properties : options.properties
    Object.keys(properties).forEach((property) => {
      // get the style value for the current property
      const style = Array.isArray(options)
        ? options[index].properties[property as keyof CSSProperties]
        : options.properties[property as keyof CSSProperties]

      // attempt to find a theme value if one has been provided
      if (typeof style !== 'boolean' && style != null) {
        const themed = getThemeValue(style.theme, value, theme)

        if (themed != null) {
          styles[property] = themed
          return
        }

        // if there is a fallback use that when a theme value cannot be found
        if (style.fallback != null) {
          styles[property] = style.fallback
          return
        }
      }

      styles[property] = value
    })

    return styles
  }

  const foundations = Array.isArray(options) ? options : [options]
  const parser = new Parser<Array<FoundationConfig<T>>>(foundations, parse)
  return parser.parse
}

export default foundation
