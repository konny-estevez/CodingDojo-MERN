import React from 'react';
import {Counter} from './Counter';

export const FirstCounter = () => (
    <Counter 
        initialValue={5}
        render={({ count, increment }) => (
            <div className="black-border">
                <h2>The count is currently {count}!</h2>
                <button onClick={increment}>Add One</button>
            </div>
        )}
    />
)