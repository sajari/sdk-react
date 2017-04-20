# Getting started with Sajari and React!

This tutorial will explain how to get up and running with Sajari and React.

Part 1 will involve setting up a react project as a starting point. If you have an existing React app, jump to [Adding Sajari](#adding-sajari).

# Creating a skeleton

Getting a basic React app up and running on webpack isn't too hard these days. There are plenty of tutorials and sample webpack config files around, but configuring webpack is not the point of this tutorial. I'm going to go with [create-react-app](https://github.com/facebookincubator/create-react-app), currently version `0.2.3`, from Facebook. It makes getting started, developing, and building a optimised build for our app quick and easy. See [here](https://github.com/facebookincubator/create-react-app#why-use-this) for more reasons why.

First we're going to get the create-react-app tool with.

```
npm install -g create-react-app
```

This will install the tool globally onto your system. Next we're going to pick a name for our project and create it. We'll go with `hello-world` for now.

```
create-react-app hello-world
```

This will create a directory called `hello-world` with your project in it in the current working directory. We're done with the `create-react-app` tool now.

Our new project only has 2 commands we need to worry about. `npm start` and `npm run build`. The former will run a hot-reloading server for your code, the latter will build an optimised bundle.

To see our shiny new React app in action

```
cd hello-sajari
npm start
```

You'll see this ![Image of basic app starting point](http://i.imgur.com/uxxfVmK.png).

Editing the code in the `src` directory will cause a reload of the page in your browser, so feel free to tinker around before we get started with Part 2.

# Integrating Sajari

This part will explain how to add sajari to your project. The Sajari React SDK is a React wrapping around the Sajari Javascript SDK. We'll need both of them.

Run this command from within your `hello-world` directory.

```
npm install --save sajari sajari-sdk-react
````

You now have all the required dependencies to get started.

# Performing a Search

This part will explain how to make a request to the Sajari Service.

At the top of your `src/App.js` file, there are a few things we need to import from the SDK.

```jsx
import { RegisterNamespace, Body, Run } from 'sajari-sdk-react'
```

`RegisterNamespace` allows us to set our Sajari account defailt, `Body` will be used to tell Sajari our search query, `Run` will perform the search.

We'll stick these in the `render` function of the `App` class and have our first search going!

Put these anywhere inside the most outer `div`.

```jsx
<RegisterNamespace project='my-project' collection='my-collection' namespace='default' />
<Body body='test' namespace='default' />
<Run namespace='default' />
```

Save and switch over to your browser, if you open up the network tab in your developer tools you'll see a search request to `apid.sajari.com`.

Congratulations, you've successfully made your first Sajari search from React!

```jsx
import React, { Component } from 'react'
import { Body, RegisterNamespace, Run } from 'sajari-sdk-react'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">

        <RegisterNamespace project='my-project' collection='my-collection' namespace='default' />
        <Body body='test' />
        <Run namespace='default' />

        <div className="App-header">
          <h2>Hello Sajari!</h2>
        </div>

      </div>
    )
  }
}

export default App
```

# Results

Now that you've got a search happening it would be nice to see some results!

We'll make a `Results` component to display the results, we're going to use the `ResultInjector` component to inject the search results into our `Results` component.

Add `ResultInjector` to the list of components being imported from `sajari-sdk-react`, and add this section at the bottom of the `App` class before the closing `div`.

```jsx
<ResultInjector namespace='default'>
  <Results />
</ResultInjector>
```

Next, we'll create a file `src/Results.js`. I'll give the component I made to demonstrate, the `Results` compoment. I won't explain this because it's just React rendering.

```jsx
import React, { Component } from 'react'

class Results extends Component {
  render() {
    const results = this.props.results
    if (!results) {
      return null
    }

    // 'default' in this context is the namespace used in 'RegisterComponent' from App.js
    const resultList = results.default.results.map(r => (
      <div key={r.meta._id} className='result'>
        <h2>{r.meta.title}</h2>
        <p>{r.meta.description}</p>
      </div>
    ))

    return (
      <div className='results'>
        {resultList}
      </div>
    )
  }
}

export default Results
```

# Instant Search

We've now got an app with search happening and results rendering. If you just want recommendations, this might be all you need. If you'd like to have search as you type functionality though, it's only a little bit extra.

The props from the `sajari-sdk-react` components represent the state of your search query, and therefore the results you see on page. Simply changing the `body` prop on the `Body` component is enough to trigger a new search and update the results automatically. That's it. All we have to do is tie the `Body` component with an `input` element and we've got instant search.

We'll want to make a component to Wrap this behaviour. We'll make a `SearchBox` component in `src/SearchBox.js`.

We might have an input element like this as our search box

```jsx
class SearchBox extends Component {
  render() {
    return (
      <div className='search-box'>
        <input type='text' />
      </div>
    )
  }
}
```

Now we just need to link this with a body component. To do this, we're going to have to introduce some state to this component to hold the value of the input field.

```jsx
class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = { body: '' }
  }

  render() {
    return (
      <div className='search-box'>
        <input type='text' value={this.state.body} onChange={e => this.setState({ body: e.target.value })} />
      </div>
    )
  }
}
```

We've now got the value of the input element stored in the component state. All that's left is to add a `Body` component that uses that value. Our render method will look like this.

```jsx
<div className='search-box'>
  <input type='text' value={this.state.body} onChange={e => this.setState({ body: e.target.value })} />
  <Body body={this.state.body} namespace='default' />
</div>
```

Last step to connect all the bits is to import the `SearchBox` component into your `App.js` file. I put it inside the `App-header` class.

Our little search app is now functional, with instant search and result rendering, all in under 90 lines of simple React.

<p align="center">
  <img src="http://i.imgur.com/XA6t005.gif" alt="Finished result of tutorial">
</p>

# Code

## App.js

```jsx
import React, { Component } from 'react'
import { RegisterNamespace, ResultInjector } from 'sajari-sdk-react'

import SearchBox from './SearchBox'
import Results from './Results'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">

        <RegisterNamespace project='my-project' collection='my-collection' namespace='default' />

        <div className="App-header">
          <h2>Hello Sajari!</h2>
          <SearchBox />
        </div>

        <ResultInjector namespace='default'>
          <Results />
        </ResultInjector>

      </div>
    )
  }
}

export default App
```

## SearchBox.js

```jsx
import React, { Component } from 'react'
import { Body } from 'sajari-sdk-react'

class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = { body: '' }
  }

  render() {
    return (
      <div className='search-box'>
        <input type='text' value={this.state.body} onChange={e => this.setState({ body: e.target.value })} />
        <Body body={this.state.body} namespace='default' />
      </div>
    )
  }
}

export default SearchBox
```

## Results.js

```jsx
import React, { Component } from 'react'

class Results extends Component {
  render() {
    const results = this.props.results
    if (!results) {
      return null
    }

    // 'default' in this context is the namespace used in 'RegisterComponent' from App.js
    const resultList = results.default.results.map(r => (
      <div key={r.meta._id} className='result'>
        <h2>Search Title Example!!!!</h2>
        <p>Search Description Example !!!!</p>
      </div>
    ))

    return (
      <div className='results'>
        {resultList}
      </div>
    )
  }
}

export default Results
```
