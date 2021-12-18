import type { ResponsivePropValue } from '@/types'
import type { Property } from 'csstype'

import foundation from '@/primitives/foundation'

export type DisplayProps = {
  display?: ResponsivePropValue<Property.Display>
}

export const display = foundation({
  prop: 'display',
  properties: {
    display: true,
  },
})
