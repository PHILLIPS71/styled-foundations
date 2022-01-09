import type { FoundationConfig } from '@/primitives/foundation'
import type { ResponsivePropValue } from '@/types'

import foundation from '@/primitives/foundation'

const options: Record<string, FoundationConfig<any>> = {
  all: {
    prop: ['padding', 'p'],
    properties: {
      padding: {
        theme: 'space',
      },
    },
  },
  top: {
    prop: ['paddingTop', 'pt'],
    properties: {
      paddingTop: {
        theme: 'space',
      },
    },
  },
  right: {
    prop: ['paddingRight', 'pr'],
    properties: {
      paddingRight: {
        theme: 'space',
      },
    },
  },
  bottom: {
    prop: ['paddingBottom', 'pb'],
    properties: {
      paddingBottom: {
        theme: 'space',
      },
    },
  },
  left: {
    prop: ['paddingLeft', 'pl'],
    properties: {
      paddingLeft: {
        theme: 'space',
      },
    },
  },
  x: {
    prop: ['paddingX', 'px'],
    properties: {
      paddingLeft: {
        theme: 'space',
      },
      paddingRight: {
        theme: 'space',
      },
    },
  },
  y: {
    prop: ['paddingY', 'py'],
    properties: {
      paddingTop: {
        theme: 'space',
      },
      paddingBottom: {
        theme: 'space',
      },
    },
  },
}

export type PaddingProps = {
  padding?: ResponsivePropValue<string>
  p?: ResponsivePropValue<string>

  paddingTop?: ResponsivePropValue<string>
  pt?: ResponsivePropValue<string>

  paddingRight?: ResponsivePropValue<string>
  pr?: ResponsivePropValue<string>

  paddingBottom?: ResponsivePropValue<string>
  pb?: ResponsivePropValue<string>

  paddingLeft?: ResponsivePropValue<string>
  pl?: ResponsivePropValue<string>

  paddingX?: ResponsivePropValue<string>
  px?: ResponsivePropValue<string>

  paddingY?: ResponsivePropValue<string>
  py?: ResponsivePropValue<string>
}

export const padding = foundation([
  {
    ...options.all,
  },
  {
    ...options.top,
  },
  {
    ...options.right,
  },
  {
    ...options.bottom,
  },
  {
    ...options.left,
  },
  {
    ...options.y,
  },
  {
    ...options.x,
  },
])

export default options
