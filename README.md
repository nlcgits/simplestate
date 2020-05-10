# simplestate

Easy to learn and use replacement for MobX and Redux in React projects.

## Installation

To install SimpleState in your project, run:

  `npm install @nextlevelcoder/simplestate`


## Usage

SimpleState can be used in Functional and Class React Components. The module includes a global SimpleState instance as simpleState, in  addition to the SimpleState class.

SimpleState can also be subscribed to by functions, which can be used to modify derivative state.

### Functional Components

Access the shared state "hello" using the variable "hello". Just as with the standard useState, you can pass a default value (true in the example).

```js
import { simpleState } from '@nextlevelcoder/simplestate';

function MyComponent(props) {
    const [hello, setHello] = simpleState.useState('hello', true);
    . . . 
}
```

To set state you can use the returned set function (setHello) or SimpleState.setState as demonstrated in the Class Component section.

### Class Components

Access the shared state "hello" as "this.state.hello".

```js
import { simpleState } from '@nextlevelcoder/simplestate';

class MyComponent extends Component {
    componentWillMount() {
        simpleState.bindState(this, 'hello');
    }
    componentWillUnmount() {
        simpleState.unbindState(this);
        // To unbind just hello, use simpleState.unbindState(this, 'hello');
    }
    . . .
}
```

To bind multiple states, pass an array as the second param instead of a string:
```js
import { simpleState } from '@nextlevelcoder/simplestate';

class MyComponent extends Component {
    componentWillMount() {
        simpleState.bindState(this, ['connected', 'latency']);
    }
    componentWillUnmount() {
        simpleState.unbindState(this);
        // To unbind multiple states (but not all states) call simpleState.unbindState(this, ['connected', 'latency]);
    }
    . . .
}
```



If you want to group related states in a single object on your state, you can pass an optional third parameter with the group name:
```js
class MyComponent extends Component {
    componentWillMount() {
        // Access with this.state.sharedState.hello
        simpleState.bindState(this, 'hello', 'sharedState');
        // Access with this.state.networkState.online and this.state.networkState.latency
        simpleState.bindState(this, ['online', 'latency'], 'networkState');
    }
    componentWillUnmount() {
        // Group name isn't required to unbind, even when listing states.
        simpleState.unbindState(this);
    }
    . . .
}
```

To set state from a class component, you can call setState the same way you would for a component's state:
```js
simpleState.setState({ hello: false });
```

### Methods

```js
import { simpleState } from '@nextlevelcoder/simplestate';

const mySubscriber = (state, value)=>{
    simpleState.setState('derivedState', value*2);
};

simpleState.subscribe('originalState', mySubscriber);
. . .

// If we ever want to stop updating derivedState
simpleState.unsubscibe('originalState', mySubscriber);
```

### Multiple SimpleStates

SimpleState is a class you can instantiate as many times as you'd like.

#### SimpleStateMap

The best way to use multiple SimpleStates is with a SimpleStateMap. This is just a [DefaultMap](https://github.com/nlcgits/defaultmap) with a helper that creates new SimpleStates as its default value.

A global instance of SimpleStateMap can be imported as used as follows:

```js
import { simpleStateMap } from '@nextlevelcoder/simplestate';

const accountState = simpleStateMap.getState('account');
const shoppingCartState = simpleStateMap.getState('shoppingCart');
```

Then you can use each SimpleState the way you used the global simpleState instance in the example above.

simpleStateMap is a global instance of SimpleStateMap. You can import and instantiate multiple SimpleStateMaps if you really want to complicate your code.

```js
import { SimpleStateMap } from '@nextlevelcoder/simplestate';

const accountState = new SimpleStateMap();
const shoppingCartState = new SimpleStateMap();

// Export your manually create SimpleStateMaps to use them in other files.
export { accountState, shoppingCartState };
```

#### Manually

You can also declare and export multiple SimpleStates in a file shared by your components.

```js
import { SimpleState } from '@nextlevelcoder/simplestate';

const accountState = new SimpleState();
const shoppingCartState = new SimpleState();

// Export your SimpleStates to use them in other files.
export { accountState, shoppingCartState };
```

Then just import your instances in the files that need to use them.
