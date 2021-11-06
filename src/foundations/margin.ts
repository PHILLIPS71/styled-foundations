import type { ResponsiveValue } from '@/types'

import foundation from '@/primitives/foundation'

export type MarginProps = {
  m?: ResponsiveValue
  margin?: ResponsiveValue
}

export const m = foundation({
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

export const mx = foundation({
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

export const my = foundation({
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

export const mt = foundation({
  prop: ['mt', 'marginTop'],
  properties: {
    marginTop: true,
  },
})

export type MarginRightProps = {
  mr?: ResponsiveValue
  marginRight?: ResponsiveValue
}

export const mr = foundation({
  prop: ['mr', 'marginRight'],
  properties: {
    marginRight: true,
  },
})

export type MarginBottomProps = {
  mb?: ResponsiveValue
  marginBottom?: ResponsiveValue
}

export const mb = foundation({
  prop: ['mb', 'marginBottom'],
  properties: {
    marginBottom: true,
  },
})

export type MarginLeftProps = {
  my?: ResponsiveValue
  marginY?: ResponsiveValue
}

export const ml = foundation({
  prop: ['ml', 'marginLeft'],
  properties: {
    marginLeft: true,
  },
})
