import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { State, Store } from '@sambego/storybook-state'

import Flipcard from '../src/Flipcard.js'
import '../src/Flipcard.css'
import './stories.css'

let padding = '5vw'
let purple = '#856f8e'

const store = new Store({
  flipped: false,
})

const Button = props => (
  <button
    {...props}
    style={{
      borderRadius: '999px',
      backgroundColor: purple,
      color: 'white',
      padding: '1em 2.5em',
      fontSize: '1rem',
      marginBottom: '1em',
      borderColor: 'transparent',
      cursor: 'pointer',
    }}>
    {props.children}
  </button>
)

Button.defaultProps = {
  children: 'Flip',
  onClick: e => store.set({ flipped: !store.get('flipped') }),
}

const Card = props => {
  return (
    <div
      style={{
        fontSize: `${props.fontSize}rem`,
        fontWeight: 600,
        background: 'white',
        color: purple,
        padding: '0',
        position: 'relative',
      }}
      {...props}>
      <div style={{ padding: '3rem' }}>{props.children}</div>
    </div>
  )
}

Card.defaultProps = {
  fontSize: 10,
}

storiesOf('Flipcard', module)
  .add('with defaults', () => (
    <div>
      <Button />
      <State store={store}>
        <Flipcard>
          <Card>One</Card>
          <Card>Two</Card>
        </Flipcard>
      </State>
    </div>
  ))
  .add('with no styling', () => (
    <div>
      <Button />
      <State store={store}>
        <Flipcard>
          <h1>h1 One</h1>
          <h1>h1 Two</h1>
        </Flipcard>
      </State>
      <p style={{ minWidth: '500px', marginTop: '7rem' }}>
        This component includes as little styling opinions as necessary—nearly
        all the styles for these examples is included within the tests, rather
        than within the React component. Note the button isn’t part of the
        component either—you can use any kind of button or input you want to
        trigger the flip by passing the <code>flipped</code> prop to{' '}
        <code>&lt;Flipcard/&gt;</code>.
      </p>
    </div>
  ))
  .add('with click on the Flipcard', () => (
    <div>
      <State store={store}>
        <Flipcard onClick={e => store.set({ flipped: !store.get('flipped') })}>
          <Card>One</Card>
          <Card>Two</Card>
        </Flipcard>
      </State>
    </div>
  ))
  .add('with click on the first card only', () => (
    <div>
      <Button />
      <State store={store}>
        <Flipcard>
          <Card
            fontSize={2}
            onClick={e => store.set({ flipped: !store.get('flipped') })}>
            Click this side
          </Card>
          <Card fontSize={2}>Not this side</Card>
        </Flipcard>
      </State>
    </div>
  ))
  .add('with conditional two-column layout', () => {
    // Reset Store on render for this demo
    store.set({ flipped: false })
    let copy = `Lorem ipsum dolor sit amet, apeirian incorrupte instructior nam in, te mea falli hendrerit, id nullam ignota verterem ius. Sed id agam augue aliquam, unum dolores mandamus ne sed. Ne vide etiam viderer per, augue quidam quo at. Tractatos forensibus cu vim, ne labitur fuisset his.`
    let css = `
  .Flipcard-flipper { outline: 10px solid ${purple}; display: flex; transform: none !important; }
  .Flipcard-front, .Flipcard-back { position: relative; transform: none !important; opacity: 1 !important; }
  `
    let disabledButton = false

    return (
      <div>
        <MediaQueryChanger css={css} store={store}>
          <State store={store}>
            <Flipcard>
              <Card>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                  <h2>Left side of layout</h2>
                  <p>{copy}</p>
                </div>
              </Card>
              <Card>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                  <h2>Right side of layout</h2>
                  <p>{copy}</p>
                </div>
              </Card>
            </Flipcard>
          </State>
        </MediaQueryChanger>
      </div>
    )
  })

class MediaQueryChanger extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      minWidth: props.minWidth,
    }
  }

  render() {
    const props = this.props
    const state = this.state
    const store = props.store
    let css = `
@media (min-width: ${state.minWidth}px) {
  ${props.css}
}`
    let disabledButton = false
    if (typeof window !== 'undefined') {
      disabledButton = window.matchMedia(`min-width: ${state.minWidth}px`)
        .matches
    }
    console.log('render', disabledButton)

    return (
      <React.Fragment>
        <label style={{ display: 'block', marginBottom: '25px' }}>
          If the browser viewport is at least&nbsp;
          <input
            type="number"
            style={{
              padding: '0.5em',
              borderRadius: '3px',
              fontFamily: 'inherit',
              fontFeatureSettings: `"tnum"`,
              border: '1px solid',
            }}
            min={0}
            defaultValue={state.minWidth}
            onChange={e => {
              let num = e.target.valueAsNumber
              if (num.toString() != 'NaN') {
                this.setState({ minWidth: num })
              }
            }}
          />px wide, apply the two-column CSS. This is done purely through CSS,
          the JS portion is just to make the media query interactive for this
          demo. Scale your browser width smaller than this number to switch back
          to a Flipcard.
        </label>
        <Button disabled={disabledButton}>
          {disabledButton ? 'Disabled' : 'Flip'}
        </Button>
        <pre>
          <code
            style={{
              lineHeight: 1.4,
              fontFamily: `Source Code Pro, monaco, monospace`,
            }}>
            {css}
          </code>
        </pre>
        <div>{props.children}</div>
        <style>{css}</style>
      </React.Fragment>
    )
  }
}

MediaQueryChanger.defaultProps = {
  minWidth: 500,
}

storiesOf('Transitions', module)
  .add('with horizontal (default)', () => {
    // Reset Store on render for this demo
    store.set({ flipped: false })

    return (
      <div>
        <Button />
        <State store={store}>
          <Flipcard>
            <Card>One</Card>
            <Card>Two</Card>
          </Flipcard>
        </State>
      </div>
    )
  })
  .add('with revolving door', () => {
    // Reset Store on render for this demo
    store.set({ flipped: false })

    return (
      <div>
        <Button />
        <State store={store}>
          <Flipcard type="revolving-door">
            <Card>One</Card>
            <Card>Two</Card>
          </Flipcard>
        </State>
      </div>
    )
  })
  .add('with very slow CSS variable transition', () => {
    // Reset Store on render for this demo
    store.set({ flipped: false })

    return (
      <div>
        <Button />
        <State store={store}>
          <Flipcard>
            <Card>One</Card>
            <Card>Two</Card>
          </Flipcard>
        </State>
        <style>
          {`:root {
  --flipcard-transition-duration: 3s;
}`}
        </style>
      </div>
    )
  })
  .add('with custom CSS variable easing function', () => {
    // Reset Store on render for this demo
    store.set({ flipped: false })

    return (
      <div>
        <Button />
        <State store={store}>
          <Flipcard>
            <Card>One</Card>
            <Card>Two</Card>
          </Flipcard>
        </State>
        <style>
          {`:root {
  --flipcard-transition-duration: 1s;
  --flipcard-transition-easing-function: cubic-bezier(0.33, 0.97, 0.82, -0.71);
}`}
        </style>
      </div>
    )
  })
