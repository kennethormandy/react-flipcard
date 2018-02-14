import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { State, Store } from '@sambego/storybook-state'

import Flipcard from '../src/Flipcard.js'
import '../src/Flipcard.css'
import './stories.css'

let padding = '5vw'

const store = new Store({
  flipped: false,
})

const Button = props => (
  <button
    {...props}
    style={{
      borderRadius: '999px',
      backgroundColor: 'cornflowerblue',
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
        color: 'cornflowerblue',
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
  .add('with revolving door transition', () => {
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
  .add('with no styling', () => (
    <div>
      <Button />
      <State store={store}>
        <Flipcard>
          <h1>h1 One</h1>
          <h1>h1 Two</h1>
        </Flipcard>
      </State>
      <p style={{ maxWidth: '500px', marginTop: '7rem' }}>
        This component includes as little styling opinions as necessary—nearly
        all the styles for these examples is included within the tests, rather
        than within the React component. Note the button isn’t part of the
        component either—you can use any kind of button or input you want to
        trigger the flip by passing the <code>flipped</code> prop to{' '}
        <code>&lt;Flipcard/&gt;</code>.
      </p>
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
  .add('with disabled prop', () => (
    <div>
      <Button />
      <State store={store}>
        <Flipcard disabled={true}>
          <Card>One</Card>
          <Card>Two</Card>
        </Flipcard>
      </State>
    </div>
  ))
