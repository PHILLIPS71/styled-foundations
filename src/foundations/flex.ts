import type { FoundationConfig } from '@/primitives/foundation'
import type { ResponsivePropValue } from '@/types'
import type { Property } from 'csstype'

import foundation from '@/primitives/foundation'

export type FlexProps = {
  flex?: ResponsivePropValue<Property.Flex>
  flexBasis?: ResponsivePropValue<Property.FlexBasis>
  flexDirection?: ResponsivePropValue<Property.FlexDirection>
  flexFlow?: ResponsivePropValue<Property.FlexFlow>
  flexGrow?: ResponsivePropValue<Property.FlexGrow>
  flexShrink?: ResponsivePropValue<Property.FlexShrink>
  flexWrap?: ResponsivePropValue<Property.FlexWrap>
  alignContent?: ResponsivePropValue<Property.AlignContent>
  alignItems?: ResponsivePropValue<Property.AlignItems>
  alignSelf?: ResponsivePropValue<Property.AlignSelf>
  gridGap?: ResponsivePropValue<Property.GridGap>
  justifyContent?: ResponsivePropValue<Property.JustifyContent>
}

const options: Record<string, FoundationConfig<any>> = {
  flex: {
    prop: 'flex',
    properties: {
      flex: true,
    },
  },
  flexBasis: {
    prop: 'flexBasis',
    properties: {
      flexBasis: true,
    },
  },
  flexDirection: {
    prop: 'flexDirection',
    properties: {
      flexDirection: true,
    },
  },
  flexFlow: {
    prop: 'flexFlow',
    properties: {
      flexFlow: true,
    },
  },
  flexGrow: {
    prop: 'flexGrow',
    properties: {
      flexGrow: true,
    },
  },
  flexShrink: {
    prop: 'flexShrink',
    properties: {
      flexShrink: true,
    },
  },
  flexWrap: {
    prop: 'flexWrap',
    properties: {
      flexWrap: true,
    },
  },
  alignContent: {
    prop: 'alignContent',
    properties: {
      alignContent: true,
    },
  },
  alignItems: {
    prop: 'alignItems',
    properties: {
      alignItems: true,
    },
  },
  alignSelf: {
    prop: 'alignSelf',
    properties: {
      alignSelf: true,
    },
  },
  gridGap: {
    prop: 'gridGap',
    properties: {
      gridGap: {
        theme: 'space',
      },
    },
  },
  justifyContent: {
    prop: 'justifyContent',
    properties: {
      justifyContent: true,
    },
  },
}

export const flex = foundation([
  {
    ...options.flex,
  },
  {
    ...options.flexBasis,
  },
  {
    ...options.flexDirection,
  },
  {
    ...options.flexFlow,
  },
  {
    ...options.flexGrow,
  },
  {
    ...options.flexShrink,
  },
  {
    ...options.flexWrap,
  },
  {
    ...options.alignContent,
  },
  {
    ...options.alignItems,
  },
  {
    ...options.alignSelf,
  },
  {
    ...options.gridGap,
  },
  {
    ...options.justifyContent,
  },
])

export default options
