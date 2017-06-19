/**
 * Created by jfhuang on 17/6/18.
 */

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

class Square extends Component {
    constructor () {
        super();
        this.state = {
            value: ''
        };
    }
    render () {
        return (
            <div className="square-box" onClick={() => {
                if (this.props.gameState.start) {
                    this.setState({
                        value: this.props.gameState.next
                    });
                }
            }}>
                {this.state.value}
            </div>
        );
    }
}

export default Square;
