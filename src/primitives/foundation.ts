import type { CSSObject, CSSProperties, Paths, Responsive, ResponsiveValue, Theme } from '@/types'

import Parser from '@/parser'
import { getTheme, getThemeValue } from '@/theme/theme'

type FoundationProperty<T> =
  | boolean
  | {
      theme: Paths<T>
      fallback: string | number
    }

type FoundationArgs<K> = {
  prop: string
  properties: {
    [T in keyof CSSProperties]?: FoundationProperty<K>
  }
}

const getPropertyValue = <T>(value: string | number, property: FoundationProperty<T>, theme?: Theme) => {
  if (theme == null) {
    return value
  }

  if (typeof property === 'boolean') {
    return value
  }

  return getThemeValue<Record<string, number>>(theme, property.theme)[value]
}

const foundation = <TTheme, T = CSSObject>(args: FoundationArgs<TTheme>) => {
  const parse = (value: ResponsiveValue, props: Record<string, unknown>): Responsive<CSSObject> => {
    const theme = getTheme(props)
    let values = []

    if (typeof value === 'string' || typeof value === 'number') {
      values.push(value)
    }

    if (Array.isArray(value)) {
      values = value
    }

    if (values.length > 0) {
      const css: Responsive<CSSObject> = []

      values.forEach((item) => {
        const style = {} as CSSObject

        Object.keys(args.properties).forEach((key) => {
          const property = args.properties[key as keyof CSSProperties] as FoundationProperty<TTheme>
          style[key] = getPropertyValue(item, property, theme)
        })

        css.push(style)
      })

      return css
    }

    const css: Responsive<CSSObject> = {}
    Object.keys(value).forEach((breakpoint) => {
      const style = {} as CSSObject

      Object.keys(args.properties).forEach((key) => {
        const property = args.properties[key as keyof CSSProperties] as FoundationProperty<TTheme>
        // @ts-ignore https://github.com/microsoft/TypeScript/issues/17002
        style[key] = getPropertyValue(value[breakpoint], property, theme)
      })

      css[breakpoint] = style
    })

    return css
  }

  const parser = new Parser<T>(parse, args.prop)
  return parser.parse
}

export default foundation
