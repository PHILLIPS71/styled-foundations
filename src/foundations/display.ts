import type { Property } from 'csstype'

import foundation from '@/primitives/foundation'

export type DisplayProps = {
  display?: Array<Property.Display> | Property.Display
}

export const display = foundation({
  prop: 'display',
  properties: {
    display: true,
  },
})
