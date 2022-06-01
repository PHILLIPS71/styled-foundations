<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Styled Foundations</h3>

  <p align="center">
    A foundation of primitive building blocks for rapid component design and development
    <br />
    <a href="https://github.com/PHILLIPS71/styled-foundations"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/PHILLIPS71/styled-foundations/issues">Bug Report</a>
    ·
    <a href="https://github.com/PHILLIPS71/styled-foundations/issues">Feature Request</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#theming">Theming</a>
        <ul>
            <li><a href="#breakpoint-array">Breakpoint Array</a>
            <li><a href="#breakpoint-object">Breakpoint Object</a>
        </ul>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li>
          <a href="#foundation">Foundation</a>
          <ul>
            <li><a href="#shorthand-foundation">Shorthand Foundation</a>
            <li><a href="#multiple-foundations">Multiple Foundations</a>
            <li><a href="#prebuilt-foundations">Prebuilt Foundations</a>
        </ul>
        </li>
        <li><a href="#prerequisites">Variants</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

There are many design systems packages available; however, I didn't find one that really suited all my needs or requirements so I've been building out my own. I wanted a small, simple yet extensible layer that work in conjunction with most css in js libraries that supported Typescript out of the box.

### Features:

- Hooks directly into your existing theme
- Works with most css in js libraries, but built primarily to work along side styled-components
- Responsive out of the box, each <em>primitive</em> and <em>foundation</em> can output different styles based on configured breakpoints
- Existing foundations are set up to be unambiguous between the styles they produce
- Rapidly create your own set of foundations or hook easily hook into the ones already provided

Of course, no one package will serve all projects since your needs may be different. I'll be enhancing and adding to this package as requirements arise. You may also suggest changes by forking this repo and creating a pull request or opening an issue.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Styled Foundations is a collection of utility functions that allow you to extend your React components in a easy and predictable manner, allowing you to use your already configured theme to control your styles without needing to refactor large parts of your codebase.

### Prerequisites

Styled Foundations is to be used in conjunction with your css in js package of choice, if this is a new project you will need to install and configure one so Styled Foundations can be used.

### Installation

To use Styled Foundations you'll need to install a css in js package such as [styled-components](https://styled-components.com/), if you already have one installed you can skip that step and install just install styled-foundations.

```sh
yarn add styled-components
yarn add styled-foundations
```

### Theming

Most css in js packages will provide you with some sort of <em>ThemeProvider</em> so you can access your projects theme when constructing your components. Styled Foundations will work out of the box with minimal additional configuration with your existing theme.

To make use of responsive foundations your theme will need to have a breakpoints property configured, this is how and where Styled Foundations looks when creating media queries when outputting css. You have two flavours to choose from, either an array of breakpoints or an object with named breakpoints, both have their pros and cons.

<b>Breakpoint Array</b>

```jsx
// theme declaration that will be consumed by your css in js library
const theme = {
  breakpoints: ['48em', '64em', '76em', '88em'],
}

// prop usage when calling upon your components (these reflect the order declared in your theme)
;<Block margin={['0.25rem', '0.5rem', '0.75rem', '1rem']} />
```

<b>Breakpoint Object</b>

A key advantage of using an object over an array is that when providing the props for your components you can easily skip over the breakpoint by not including it. You can also use the array syntax in the props as long as you have each desired value in order.

```jsx
// theme declaration that will be consumed by your css in js library
const theme = {
  breakpoints: {
    sm: '48em',
    md: '64em',
    lg: '76em',
    xl: '88em',
  }
}

// prop usage when calling upon your components (_ is the default size)
<Block margin={{ _: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' }} />

// or skipping some breakpoints
<Block margin={{ _: '0', sm: '0.25rem', xl: '1rem' }} />
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Foundation

A foundation is the building block of Styled Foundations and is how you can easily construct reusable modifiers throughout your components. If there is a foundation that is not already provided by our existing set of foundations, you can create your own by using the foundation utility.

```tsx
import type { Theme } from 'types'

import styled from 'styled-components'
import { foundation } from 'styled-foundations'

const color = foundation<Theme>({
  prop: ['color', 'colour'],
  properties: {
    color: {
      theme: 'colors',
      fallback: '#00DC82',
    },
  },
})

const ColoredParagraph = styled.p`
  ${color}
`

export default ColoredParagraph
```

The color foundation created here will allow you to provide either a color or colour prop to specify what text color the paragraph tag will be. It will look in your theme too and pickup and values under the colors property. If no color property is set on the ColoredParagraph component it will fallback and use #00DC82 as a default value.

- <code>prop</code> either a string or an array of the names of the props to be used on the component
- <code>properties</code> a object of css properties to be used in the returned styles
- <code>properties.theme</code> a string with the key or path to an object of key value pairs in your theme
- <code>properties.fallback</code> a string of the value which should be used if a value isn't found or provided

#### Shorthand Foundation

If your foundation does not need to use your theme, or have any fallbacks you can easily omit that by using a shorthand declaration of the foundation utility.

```tsx
const paddingY = foundation({
  prop: 'py',
  properties: {
    paddingTop: true,
    paddingBottom: true,
  },
})
```

#### Multiple Foundations

If you're finding you are needing to group multiple foundations into a single object so you can easily import it to be used in your components, you can do so with the following syntax. Each option here can then be accessed via your components.

```tsx
const padding = foundation([
  {
    prop: 'px',
    properties: {
      paddingLeft: true,
      paddingRight: true,
    },
  },
  {
    prop: 'py',
    properties: {
      paddingTop: true,
      paddingBottom: true,
    },
  },
])
```

#### Prebuilt Foundations

There currently are a few already prebuilt foundations you can use, I do plan to extend upon these! Here are a few you can directly import into your projects. The props are all optional and support both longhand names and shorthand names.

| name     | props                                                                            | theme  | type          |
| -------- | -------------------------------------------------------------------------------- | ------ | ------------- |
| color    | color, colour, bg, backgoundColor                                                | colors | ColorProps    |
| display  | display                                                                          |        | DisplayProps  |
| margin   | margin, m, mt, marginTop, mr, marginRight, mb, marginBottom, ml, marginLeft      | space  | MarginProps   |
| padding  | padding, p, pt, paddingTop, pr, paddingRight, pb, paddingBottom, pl, paddingLeft | space  | PaddingProps  |
| position | position                                                                         |        | PositionProps |

##### Example Usage

```tsx
import type { MarginProps, PaddingProps } from 'styled-foundations'

import { margin, padding } from 'styled-foundations'

type BlockProps = MarginProps & PaddingProps

const Block = styled.div<BlockProps>`
  ${margin}
  ${padding}
`

// example component usage
<Block my="10px" px="5px" />
```

### Variants

You can use variants to apply different styles based on props, this can be useful when you're wanting to support multiple looks of a single reusable component. You can use this inline inside the component itself, or use a reference like in the example below.

```tsx
type Shape = 'square' | 'round' | 'pill'

const shape = variant<Shape>({
  prop: 'shape',
  variants: {
    square: {
      borderRadius: '0px',
    },
    round: {
      borderRadius: '10px',
    },
    pill: {
      borderRadius: '100px',
    },
  },
})

const Button = styled.button`
  ${shape}
`

// example component usage
<Button shape="round" />
```

### Conditional

The conditional foundation is used to colocate all your toggleable props in a single area, where they are no longer sporadically defined across a complex component with all the odd formatting they induce. You simply define either the success styles (if the condition passes where it is true), or any failure styles that could otherwise occur.

```tsx
export type ButtonProps = {
  wide?: boolean
  disabled?: boolean
}


const conditionals = conditional({
  success: {
    wide: {
      width: '100%',
    },
    disabled: {
      opacity: 0.6,
    },
  },
  failure: {
    disabled: {
      opacity: 1
    }
  }
})

const Button = styled.button<ButtonProps>`
  ${conditionals}
`

// example component usage
<Button wide disabled />
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] add responsive foundation to hook into breakpoints to remove the need to write media queries.
- [ ] add more prebuilt foundations
- [ ] improve documentation
- [ ] add unit tests

See the [open issues](https://github.com/PHILLIPS71/styled-foundations/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

This project was inspired by styled-systems, an existing package that seems to be abandoned. I've created this package to better support my needs and any community needs, where I plan to continually add them here as required.

- [Styled Systems](https://github.com/styled-system/styled-system)
- [Readme Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
