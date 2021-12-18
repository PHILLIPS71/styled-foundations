import type { FoundationConfig } from '@/primitives/foundation'
import type { ResponsivePropValue } from '@/types'

import foundation from '@/primitives/foundation'

export type ColorProps = {
  color?: ResponsivePropValue<string>
  colour?: ResponsivePropValue<string>

  backgroundColor?: ResponsivePropValue<string>
  bg?: ResponsivePropValue<string>
}

const options: Record<string, FoundationConfig<any>> = {
  color: {
    prop: ['color', 'colour'],
    properties: {
      color: {
        theme: 'colors',
      },
    },
  },
  bg: {
    prop: ['backgroundColor', 'bg'],
    properties: {
      backgroundColor: {
        theme: 'colors',
      },
    },
  },
}

export const color = foundation([
  {
    ...options.color,
  },
  {
    ...options.bg,
  },
])
