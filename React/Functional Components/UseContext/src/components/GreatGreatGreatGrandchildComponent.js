import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

const GreatGreatGreatGrandchildComponent = (props) =>{
    const context = useContext(MyContext);
    return(
      <div>
        hello, this is the value of context: {context.val}
      </div>
    )
}
export default GreatGreatGreatGrandchildComponent;