/**
 * Created by jfhuang on 17/6/18.
 */
import React, { Component } from 'react';
import Squre from './Square';

class Board extends Component {

    renderRow (start, len) {
        const eles = [];
        for (let i = start; i < start + len; i++) {
            eles.push(i);
        }
        return (
            <div className="board-row clearfix" key={'row-' + start}>
                {
                    eles.map((item) => {
                        return <Squre index={item} key={item} gameState={this.props.gameState} />;
                    })
                }
            </div>
        );
    }

    render () {
        const arr = [0, 3, 6,];
        return (
            <div className="board-box">
                {
                    arr.map((item) => {
                        return this.renderRow(item, 3);
                    })
                }
            </div>
        );
    }
}

export default Board;