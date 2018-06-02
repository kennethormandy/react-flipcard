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

  componentWillReceiveProps(newProps) {
    const state = this.state
    const props = this.props
    let rotate = state.flipperRotate

    if (props.type === 'revolving-door') {
      rotate = state.flipperRotate + 180
    }

    if (!props.disabled) {
      if (
        (newProps.flipped === true && state.isFlipped === false) ||
        (newProps.flipped === false && state.isFlipped === true)
      ) {
        return this.setState({
          isFlipped: !state.isFlipped,
          flipperRotate: rotate,
        })
      }
    }

    return false
  }

  render() {
    const props = this.props
    const state = this.state
    let {
      type,
      flipped,
      disabled,
      classNameFlipper,
      classNameFront,
      classNameBack,
      ...remainingProps
    } = props

    // TODO Always seems to update styles on Safari?
    let styles = {}
    if (type === 'revolving-door') {
      let rotateY = `rotateY(${state.flipperRotate}deg)`
      styles = {
        WebkitTransform: rotateY,
        transform: rotateY,
      }
    }

    let classes = [
      'Flipcard-flipper',
      state.isFlipped === true ? 'Flipcard--flipped' : '',
      `Flipcard--${type}`,
      classNameFlipper,
    ]

    return (
      <div {...remainingProps} className="Flipcard" tabIndex={0}>
        <div className={classes.join(' ')} style={styles}>
          {[0, 1].map(index => {
            const child = props.children[index]
            let zero = 0
            let one = 1
            if (index === 1) {
              zero = 1
              one = 0
            }

            return (
              <div
                key={`Flipcard_card_${index}`}
                className={`Flipcard-${
                  index === 0
                    ? `front ${classNameFront}`
                    : `back ${classNameBack}`
                }`}
                style={{
                  opacity: state.isFlipped ? zero : one,
                  userSelect:
                    state.isFlipped && !disabled === true ? 'none' : null,
                  cursor:
                    !disabled &&
                    (typeof props.onClick === 'function' ||
                      typeof child.props.onClick === 'function')
                      ? 'pointer'
                      : 'auto',
                }}
                tabIndex={-1}
                aria-hidden={state.isFlipped && !disabled}>
                {child}
              </div>
            )
          })}
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
