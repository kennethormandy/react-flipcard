import React from 'react'
import { render } from 'react-dom'

// Compiled version to confirm build worked as expected
// import Flipcard from '../'

// Live development version for working on the library
import Flipcard from './Flipcard'

const Wrapper = props => {
  return (
    <div
      style={{
        position: 'relative',
        height: '15rem',
        margin: '0 auto',
      }}>
      {props.children}
    </div>
  )
}

const Card = props => (
  <div
    style={{
      fontSize: '5rem',
      textAlign: 'center',
      width: '100%',
      height: '500px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>
    {props.children}
  </div>
)

const Line = props => (
  <div
    style={{
      fontFamily: `SADSlices-${props.width}`,
    }}>
    {props.children}
  </div>
)

Line.defaultProps = {
  width: 'Regular',
}

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
          <Flipcard flipped={this.state.flipped} type="revolving-door">
            <Card>
              <div>
                <Line width="Regular">
                  Have&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style={{ fontFamily: 'SADSlices-UltraExtended' }}>
                    a
                  </span>
                </Line>
                <Line width="UltraExtended">cheesy</Line>
                <Line width="SemiExtended">valentine’s</Line>
                <Line width="Extended">day</Line>
                <Line width="UltraExtended">!!!</Line>
              </div>
            </Card>
            <Card>
              <div>
                <Line>Today is</Line>
                <Line>February 14.</Line>
              </div>
            </Card>
          </Flipcard>
        </Wrapper>
      </div>
    )
  }
}

render(<FlipcardExamples />, document.getElementById('js-target'))
