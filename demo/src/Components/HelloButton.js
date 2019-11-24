import React from 'react';
import { simpleState } from '@nextlevelcoder/simplestate';

function HelloButton(props) {
    const [hello, setHello] = simpleState.useState('hello', props.hello === false ? false : true);
    function handleClick(e) {
        setHello(!hello);
    }
    let helloText = hello ? "Hello" : "Goodbye";
    return (
        <button onClick={handleClick}>
            {helloText}, {props.name}!
      </button>
    );
}
export default HelloButton;