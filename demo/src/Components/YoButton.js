import React from 'react';
import { simpleState } from '@nextlevelcoder/simplestate';

function YoButton(props) {
    const [yo, setYo] = simpleState.useState('yo', true);
    function handleClick(e) {
        setYo(!yo);
    }
    let helloText = yo ? "Yo" : "No";
    return (
        <button onClick={handleClick}>
            {helloText}, {props.name}!
      </button>
    );
}
export default YoButton;