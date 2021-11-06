import type { ResponsiveValue } from '@/types'

import foundation from '@/primitives/foundation'

export type MarginProps = {
  m?: ResponsiveValue
  margin?: ResponsiveValue
}

export const margin = foundation({
  prop: ['m', 'margin'],
  properties: {
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true,
  },
})

export type MarginXProps = {
  mx?: ResponsiveValue
  marginX?: ResponsiveValue
}

export const marginX = foundation({
  prop: ['mx', 'marginX'],
  properties: {
    marginLeft: true,
    marginRight: true,
  },
})

export type MarginYProps = {
  my?: ResponsiveValue
  marginY?: ResponsiveValue
}

export const marginY = foundation({
  prop: ['my', 'marginY'],
  properties: {
    marginTop: true,
    marginBottom: true,
  },
})

export type MarginTopProps = {
  mt?: ResponsiveValue
  marginTop?: ResponsiveValue
}

export const marginTop = foundation({
  prop: ['mt', 'marginTop'],
  properties: {
    marginTop: true,
  },
})

export type MarginRightProps = {
  mr?: ResponsiveValue
  marginRight?: ResponsiveValue
}

export const marginRight = foundation({
  prop: ['mr', 'marginRight'],
  properties: {
    marginRight: true,
  },
})

export type MarginBottomProps = {
  mb?: ResponsiveValue
  marginBottom?: ResponsiveValue
}

export const marginBottom = foundation({
  prop: ['mb', 'marginBottom'],
  properties: {
    marginBottom: true,
  },
})

export type MarginLeftProps = {
  my?: ResponsiveValue
  marginY?: ResponsiveValue
}

export const marginLeft = foundation({
  prop: ['ml', 'marginLeft'],
  properties: {
    marginLeft: true,
  },
})
