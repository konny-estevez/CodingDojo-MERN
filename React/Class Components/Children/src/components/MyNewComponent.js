import React, { Component } from 'react';
    
class MyNewComponent extends Component{
    render(){
        return(
            <div>
                <h1>
                    { this.props.header }
                </h1>
                { this.props.children }
                <button onClick={ ()=> alert("This button has been clicked!") }>Click Me</button>
            </div>
        );
    }
}
    
export default MyNewComponent;
