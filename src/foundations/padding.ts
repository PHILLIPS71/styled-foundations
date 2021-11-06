import type { ResponsiveValue } from '@/types'

import foundation from '@/primitives/foundation'

export type PaddingProps = {
  p?: ResponsiveValue
  padding?: ResponsiveValue
}

export const p = foundation({
  prop: ['p', 'padding'],
  properties: {
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,
  },
})

export type PaddingXProps = {
  px?: ResponsiveValue
  paddingX?: ResponsiveValue
}

export const px = foundation({
  prop: ['px', 'paddingX'],
  properties: {
    paddingLeft: true,
    paddingRight: true,
  },
})

export type PaddingYProps = {
  py?: ResponsiveValue
  paddingY?: ResponsiveValue
}

export const py = foundation({
  prop: ['py', 'paddingY'],
  properties: {
    paddingTop: true,
    paddingBottom: true,
  },
})

export type PaddingTopProps = {
  pt?: ResponsiveValue
  paddingTop?: ResponsiveValue
}

export const pt = foundation({
  prop: ['pt', 'paddingTop'],
  properties: {
    paddingTop: true,
  },
})

export type PaddingRightProps = {
  pr?: ResponsiveValue
  paddingRight?: ResponsiveValue
}

export const pr = foundation({
  prop: ['pr', 'paddingRight'],
  properties: {
    paddingRight: true,
  },
})

export type PaddingBottomProps = {
  pb?: ResponsiveValue
  paddingBottom?: ResponsiveValue
}

export const pb = foundation({
  prop: ['pb', 'paddingBottom'],
  properties: {
    paddingBottom: true,
  },
})

export type PaddingLeftProps = {
  py?: ResponsiveValue
  paddingY?: ResponsiveValue
}

export const pl = foundation({
  prop: ['pl', 'paddingLeft'],
  properties: {
    paddingLeft: true,
  },
})
