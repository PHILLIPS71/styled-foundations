import type { ResponsivePropValue } from '@/types'
import type { Property } from 'csstype'

import foundation from '@/primitives/foundation'

export type PositionProps = {
  position?: ResponsivePropValue<Property.Position>
}

export const position = foundation({
  prop: 'position',
  properties: {
    position: true,
  },
})
