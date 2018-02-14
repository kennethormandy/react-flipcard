import React from 'react'

// Rewrite of mzabriskie/react-flipcard, MIT via https://git.io/vdKLa
// Adds support for revolving-door transition, MIT via https://git.io/vdKc7

class Flipcard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isFlipped: props.flipped,
      flipperRotate: 0,
    }
  }

  componentDidMount() {
    // this._hideFlippedSide()
  }

  componentWillReceiveProps(newProps) {
    let rotate = this.state.flipperRotate

    if (this.props.type === 'revolving-door') {
      rotate = this.state.flipperRotate + 180
    }

    if (!this.props.disabled) {
      if (
        (newProps.flipped === true && this.state.isFlipped === false) ||
        (newProps.flipped === false && this.state.isFlipped === true)
      ) {
        return this.setState({
          isFlipped: !this.state.isFlipped,
          flipperRotate: rotate,
        })
      }
    }

    return false
  }

  render() {
    const props = this.props
    const state = this.state

    // TODO Always seems to update styles on Safari?
    let styles =
      props.type === 'revolving-door'
        ? {
            WebkitTransform: `rotateY(${state.flipperRotate}deg)`,
            transform: `rotateY(${state.flipperRotate}deg)`,
          }
        : {}

    let classes = [
      'Flipcard-flipper',
      state.isFlipped === true ? 'Flipcard--flipped' : '',
      `Flipcard--${props.type}`,
      props.classNameFlipper,
    ]

    return (
      <div className="Flipcard" tabIndex={0}>
        <div className={classes.join(' ')} style={styles}>
          <div
            className={`Flipcard-front ${props.classNameFront}`}
            style={{
              opacity: state.isFlipped ? '0' : '1',
              userSelect:
                state.isFlipped && !props.disabled === true ? 'none' : null,
            }}
            tabIndex={-1}
            aria-hidden={state.isFlipped && !props.disabled}>
            {props.children[0]}
          </div>
          <div
            className={`Flipcard-back ${props.classNameBack}`}
            style={{
              opacity: state.isFlipped ? '1' : '0',
              userSelect:
                !state.isFlipped && !props.disabled === true ? 'none' : null,
            }}
            tabIndex={-1}
            aria-hidden={!state.isFlipped}>
            {props.children[1]}
          </div>
        </div>
      </div>
    )
  }
}

Flipcard.defaultProps = {
  type: 'horizontal',
  flipped: false,
  disabled: false,
  classNameFlipper: '',
  classNameFront: '',
  classNameBack: '',
}

export default Flipcard
