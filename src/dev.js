import React from 'react'
import { render } from 'react-dom'

// Compiled version to confirm build worked as expected
// import Flipcard from '../'

// Live development version for working on the library
import Flipcard from './Flipcard'

const Wrapper = props => {
  return (
    <div style={{ position: 'relative', height: '15rem' }}>
      {props.children}
    </div>
  )
}

const Card = props => (
  <div
    style={{
      fontSize: '10rem',
      border: '1px dotted',
      background: 'white',
    }}>
    {props.children}
  </div>
)

class FlipcardExamples extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flipped: false,
    }
  }

  render() {
    return (
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
        <button onClick={e => this.setState({ flipped: !this.state.flipped })}>
          Flip {this.state.flipped ? 'back' : ''}
        </button>
        <Wrapper>
          <Flipcard flipped={this.state.flipped}>
            <Card>One</Card>
            <Card>Two</Card>
          </Flipcard>
        </Wrapper>
        <Wrapper>
          <Flipcard type="revolving-door" flipped={this.state.flipped}>
            <Card>One</Card>
            <Card>Two</Card>
          </Flipcard>
        </Wrapper>
      </div>
    )
  }
}

render(<FlipcardExamples />, document.getElementById('js-target'))
