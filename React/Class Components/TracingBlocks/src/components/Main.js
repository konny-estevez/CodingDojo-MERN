import React, { Component } from 'react'

export default class Main extends Component {
    render() {
        const {children} = this.props;
        return (
            <div className="main">
                {children}
            </div>
        )
    }
}
