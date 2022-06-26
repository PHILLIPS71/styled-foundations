import type { ResponsivePropValue } from '@/types'
import type { Property } from 'csstype'

import foundation from '@/primitives/foundation'

export type TextAlignProps = {
  textAlign?: ResponsivePropValue<Property.TextAlign>
}

export const textAlign = foundation({
  prop: 'textAlign',
  properties: {
    textAlign: true,
  },
})
