import css from 'styled-jsx/css'

import { breakpoints, fonts, colors } from '../../styles/theme'
import { addOpacityToColor } from '../../styles/utils'

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, transparent 1px),
      radial-gradient(${backgroundColor} 1px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    font-family: ${fonts.base};
    margin: 0;
    overflow: hidden;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
  h1 {
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 100%;
    overflow-y: auto;
    position: relative;
    width: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 95%;
      width: ${breakpoints.mobile};
    }
  }
`
