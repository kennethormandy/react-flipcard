# Flipcard

Another React Flipcard, based on [@mzabriskie](https://github.com/mzabriskie)’s [react-flipcard](https://github.com/mzabriskie/react-flipcard), but with support for React v16, and some other considerations for the [Mort Modern](http://mort-modern.losttype.com/) type specimen site.

## Installation

```sh
npm install --save @kennethormandy/react-flipcard
```

## Example

```jsx
import React from 'react'
import { render } from 'react-dom'
import Flipcard from '@kennethormandy/react-flipcard'

// Import minimal required styles however you’d like
import '@kennethormandy/react-flipcard/dist/Flipcard.css'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      flipped: false,
    }
  }

  render() {
    return (
      <div>
        <button onClick={e => this.setState({ flipped: !this.state.flipped })}>
          Flip
        </button>
        <Flipcard flipped={this.state.flipped}>
          <h1>One</h1>
          <h1>Two</h1>
        </Flipcard>
      </div>
    )
  }
}

render(<App />, document.getElementById('target'))
```

### Transition Type

#### Horizontal

```jsx
<Flipcard type="horizontal">
  <h1>One</h1>
  <h1>Two</h1>
</Flipcard>
```

#### Revolving Door

```jsx
<Flipcard type="revolving-door">
  <h1>One</h1>
  <h1>Two</h1>
</Flipcard>
```

## Credits

* [react-flipcard](https://github.com/mzabriskie/react-flipcard) by [@mzabrisk](https://github.com/mzabriskie)ie
* [Create a CSS Flipping Animation](https://davidwalsh.name/css-flip) by David Walsh

## License

[The MIT License (MIT)](LICENSE.md)

Copyright © 2017–2018 [Kenneth Ormandy Inc.](http://kennethormandy.com)
