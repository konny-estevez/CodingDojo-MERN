import React from 'react';
 
import {Counter} from './Counter';
 
export const SecondCounter = () => (
    <Counter
        initialValue={10}
        render={({ count, increment, decrement }) => (
            <div className="black-border">
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
                <p>Current Count: {count}</p>
            </div>
        )}
    />
)