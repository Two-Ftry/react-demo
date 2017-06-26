/**
 * Created by jfhuang on 17/6/18.
 */

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

class Square extends Component {

    render () {
        return (
            <div className="square-box" onClick={() => {
                if (this.props.gameState.start) {
                    this.props.onClick();
                }
            }}>
                {this.props.value}
            </div>
        );
    }
}

export default Square;
