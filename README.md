# simplestate

Easy to learn and use replacement for MobX and Redux in React projects.

## Installation

To install SimpleState in your project, run:

  `npm install @nextlevelcoder/simplestate`


## Usage

SimpleState can be used in Functional and Class React Components. The module includes a global SimpleState instance as simpleState, in  addition to the SimpleState class.

SimpleState can also be subscribed to by functions, which can be used to modify derivative state.

### Functional Components

Access the shared state "hello" using the variable "hello".

```js
import { simpleState } from '@nextlevelcoder/simplestate';

function MyComponent(props) {
    const [hello, setHello] = simpleState.useState('hello', true);
    . . . 
}
```

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
    }
    . . .
}
```

### Methods

```js
import { simpleState } from '@nextlevelcoder/simplestate';

const mySubscriber = (state, value)=>{
    simpleState.setState('derivedState', value*2);
};

simpleState.subscribe('originalState', mySubscriber);
. . .

// If we ever want to stop updating doubleState
simpleState.unsubscibe('originalState', mySubscriber);
```