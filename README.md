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

To set state you can use the returned set function (setHello) or SimpleState.setState or SimpleState.mergeState as demonstrated in the Class Component section.

### Class Components

Access the shared state "hello" as "this.state.hello".

```js
import { simpleState } from '@nextlevelcoder/simplestate';

class MyComponent extends Component {
    componentWillMount() {
        simpleState.bindStates(this, ['hello']);
    }
    componentWillUnmount() {
        simpleState.unbindStates(this);
        // To unbind just hello, use simpleState.unbindStates(this, ['hello']);
    }
    . . .
}
```

If you want to group all states from a SimpleState you can pass an optional third parameter with the group name:
```js
class MyComponent extends Component {
    componentWillMount() {
        // Access with this.state.sharedState.hello
        simpleState.bindStates(this, ['hello'], 'sharedState');
        // Access with this.state.networkState.online
        simpleState.bindStates(this, ['online'], 'networkState');
    }
    componentWillUnmount() {
        // Group name isn't required to unbind.
        simpleState.unbindStates(this);
    }
    . . .
}
```

To set state from a class component, you can call setState or when setting multiple states, call mergeState:
```js
simpleState.setState('hello', false);
simpleState.mergeState({ hello: false });
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

The best way to use multiple SimpleStates is with a SimpleStateMap. This is just a [DefaultClass]() with a helper that creates new SimpleStates as its default value.

A global instance of SimpleStateMap can be imported as used as follows:

```js
import { simpleStateMap } from '@nextlevelcoder/simplestate';

const accountState = simpleStateMap.get('account');
const shoppingCartState = simpleStateMap.get('shoppingCart');
```

Then you can use each SimpleState the way you used the global simpleState instance in the example above.

Note: simpleStateMap is a global instance of SimpleStateMap. You can make multiple SimpleStateMaps if you really want to complicate your code.

#### Manually

You can also declare and export multiple SimpleStates in a file shared by your components.

```js
import { SimpleState } from '@nextlevelcoder/simplestate';

const accountState = new SimpleState();
const shoppingCartState = new SimpleState();

export { accountState, shoppingCartState };
```

Then just import your instances in the files that need to use them.
