import type { FoundationConfig } from '@/primitives/foundation'
import type { ResponsivePropValue } from '@/types'
import type { Property } from 'csstype'

import foundation from '@/primitives/foundation'

export type LayoutProps = {
  height?: ResponsivePropValue<Property.Height>
  minHeight?: ResponsivePropValue<Property.MinHeight>
  maxHeight?: ResponsivePropValue<Property.MaxHeight>

  width?: ResponsivePropValue<Property.Width>
  minWidth?: ResponsivePropValue<Property.MinWidth>
  maxWidth?: ResponsivePropValue<Property.MaxWidth>

  overflow?: ResponsivePropValue<Property.Overflow>
  overflowX?: ResponsivePropValue<Property.OverflowX>
  overflowY?: ResponsivePropValue<Property.OverflowY>

  size?: ResponsivePropValue<Property.Height>
}

const options: Record<string, FoundationConfig<any>> = {
  height: {
    prop: 'height',
    properties: {
      height: {
        theme: 'space',
      },
    },
  },
  minHeight: {
    prop: 'minHeight',
    properties: {
      minHeight: {
        theme: 'space',
      },
    },
  },
  maxHeight: {
    prop: 'maxHeight',
    properties: {
      maxHeight: {
        theme: 'space',
      },
    },
  },
  width: {
    prop: 'width',
    properties: {
      width: {
        theme: 'space',
      },
    },
  },
  minWidth: {
    prop: 'minWidth',
    properties: {
      minWidth: {
        theme: 'space',
      },
    },
  },
  maxWidth: {
    prop: 'maxWidth',
    properties: {
      maxWidth: {
        theme: 'space',
      },
    },
  },
  overflow: {
    prop: 'overflow',
    properties: {
      overflow: true,
    },
  },
  overflowX: {
    prop: 'overflowX',
    properties: {
      overflowX: true,
    },
  },
  overflowY: {
    prop: 'overflowY',
    properties: {
      overflowY: true,
    },
  },
  size: {
    prop: 'size',
    properties: {
      height: {
        theme: 'space',
      },
      width: {
        theme: 'space',
      },
    },
  },
}

export const layout = foundation([
  {
    ...options.height,
  },
  {
    ...options.minHeight,
  },
  {
    ...options.maxHeight,
  },
  {
    ...options.width,
  },
  {
    ...options.minWidth,
  },
  {
    ...options.maxWidth,
  },
  {
    ...options.overflow,
  },
  {
    ...options.overflowX,
  },
  {
    ...options.overflowY,
  },
  {
    ...options.size,
  },
])

export default options
