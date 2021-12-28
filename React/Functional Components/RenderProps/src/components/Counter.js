import { useState } from 'react';
 
export const Counter = ({ initialValue = 0, render }) => {
    const [count, setCount] = useState(initialValue);
 
    function increment() {
        setCount(count + 1);
    }
 
    function decrement() {
        setCount(count - 1);
    }
 
    return render({ count, increment, decrement });
}