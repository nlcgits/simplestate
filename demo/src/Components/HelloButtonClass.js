import React from 'react';
import { simpleState } from '@nextlevelcoder/simplestate';

class HelloButtonClass extends React.Component {
    constructor(props) {
        super(props);
        // Optional
        simpleState.loadState(this, ['hello']);
    }

    componentWillMount() {
        simpleState.bindState(this, ['hello']);
    }

    componentWillUnmount() {
        simpleState.unbindState(this);
    }
    handleClick = (e) => {
        simpleState.setState({ hello: !this.state.hello });
    }
    render() {
        let helloText = this.state.hello ? "Hello" : "Goodbye";
        return (
            <button onClick={this.handleClick}>
                {helloText}, {this.props.name}!
              </button>
        );
    }
}
export default HelloButtonClass;