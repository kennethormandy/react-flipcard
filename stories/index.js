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
  // Inherit because Flipcard will set it correctly
  let pointer = props.onClick ? 'pointer' : 'inherit'

  return (
    <div
      style={{
        fontSize: `${props.fontSize}rem`,
        fontWeight: 600,
        background: 'white',
        color: purple,
        padding: '0',
        position: 'relative',
        cursor: pointer,
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
