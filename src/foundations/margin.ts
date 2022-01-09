import type { FoundationConfig } from '@/primitives/foundation'
import type { ResponsivePropValue } from '@/types'

import foundation from '@/primitives/foundation'

const options: Record<string, FoundationConfig<any>> = {
  all: {
    prop: ['margin', 'm'],
    properties: {
      margin: {
        theme: 'space',
      },
    },
  },
  top: {
    prop: ['marginTop', 'mt'],
    properties: {
      marginTop: {
        theme: 'space',
      },
    },
  },
  right: {
    prop: ['marginRight', 'mr'],
    properties: {
      marginRight: {
        theme: 'space',
      },
    },
  },
  bottom: {
    prop: ['marginBottom', 'mb'],
    properties: {
      marginBottom: {
        theme: 'space',
      },
    },
  },
  left: {
    prop: ['marginLeft', 'ml'],
    properties: {
      marginLeft: {
        theme: 'space',
      },
    },
  },
  x: {
    prop: ['marginX', 'mx'],
    properties: {
      marginLeft: {
        theme: 'space',
      },
      marginRight: {
        theme: 'space',
      },
    },
  },
  y: {
    prop: ['marginY', 'my'],
    properties: {
      marginTop: {
        theme: 'space',
      },
      marginBottom: {
        theme: 'space',
      },
    },
  },
}

export type MarginProps = {
  margin?: ResponsivePropValue<string>
  m?: ResponsivePropValue<string>

  marginTop?: ResponsivePropValue<string>
  mt?: ResponsivePropValue<string>

  marginRight?: ResponsivePropValue<string>
  mr?: ResponsivePropValue<string>

  marginBottom?: ResponsivePropValue<string>
  mb?: ResponsivePropValue<string>

  marginLeft?: ResponsivePropValue<string>
  ml?: ResponsivePropValue<string>

  marginX?: ResponsivePropValue<string>
  mx?: ResponsivePropValue<string>

  marginY?: ResponsivePropValue<string>
  my?: ResponsivePropValue<string>
}

export const margin = foundation([
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
    ...options.x,
  },
  {
    ...options.y,
  },
])

export default options
