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

## Importing styles

- Can use `dist` which is already minified and autoprefixed
- Can use `src` which is not, and might be better for you if you’re already running things through your own CSS build process that’s going to do those things anyway. Then, the source maps will map back to the CSS before minification.
- Can just copy the CSS into your own process, because people have a lot of different opinions about how CSS should work within a React component. I am following an approach that will work with a fresh Create React App setup.

## Credits

* [react-flipcard](https://github.com/mzabriskie/react-flipcard) by [@mzabriskie](https://github.com/mzabriskie)
* [react-card-flip](https://github.com/AaronCCWong/react-card-flip) by [@AaronCCWong](https://github.com/AaronCCWong), for the revolving-door transition
* [Create a CSS Flipping Animation](https://davidwalsh.name/css-flip) by David Walsh

## License

[The MIT License (MIT)](LICENSE.md)

Copyright © 2017–2018 [Kenneth Ormandy Inc.](http://kennethormandy.com)
