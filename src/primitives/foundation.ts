import type { CSSObject, CSSProperties, Paths, Responsive, ResponsiveValue, Theme } from '@/types'

import Parser from '@/parser'
import { getOrderedBreakpointStyles } from '@/theme/breakpoint'
import { getTheme, getThemeValue } from '@/theme/theme'

type FoundationProperty<T> =
  | boolean
  | {
      theme: Paths<T>
      fallback: string | number
    }

type FoundationArgs<T> = {
  prop: string
  properties: {
    [K in keyof CSSProperties]?: FoundationProperty<T>
  }
}

const getPropertyValue = <T>(value: string | number, property: FoundationProperty<T>, theme?: Theme) => {
  if (theme == null) {
    return value
  }

  if (typeof property === 'boolean') {
    return value
  }

  const themed = getThemeValue<Record<string, number>>(theme, property.theme)[value]
  if (themed != null) {
    return themed
  }

  return value
}

const foundation = <T, S = any>(args: FoundationArgs<T>) => {
  const parse = (value: ResponsiveValue, props: Record<string, unknown>): Responsive<CSSObject> => {
    const theme = getTheme(props)
    let values = []

    if (typeof value === 'string' || typeof value === 'number') {
      values.push(value)
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        values = value
      } else {
        const ordered = getOrderedBreakpointStyles(value, theme)
        Object.keys(ordered).forEach((breakpoint) => {
          values.push(ordered[breakpoint])
        })
      }
    }

    const css: Responsive<CSSObject> = []
    values.forEach((item) => {
      const style = {} as CSSObject

      Object.keys(args.properties).forEach((key) => {
        const property = args.properties[key as keyof CSSProperties] as FoundationProperty<T>
        style[key] = getPropertyValue(item, property, theme)
      })

      css.push(style)
    })

    return css
  }

  const parser = new Parser<S>(parse, args.prop)
  return parser.parse
}

export default foundation
