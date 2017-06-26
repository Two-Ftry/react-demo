/**
 * Created by jfhuang on 17/6/18.
 */
import React, { Component } from 'react';
import Squre from './Square';

class Board extends Component {

    constructor () {
        super();
        this.state = {
            squares: Array(9).fill(null)
        };
    }

    renderRow (start, len, curState) {
        const eles = [];
        for (let i = start; i < start + len; i++) {
            eles.push(i);
        }
        return (
            <div className="board-row clearfix" key={'row-' + start}>
                {
                    eles.map((item) => {
                        return <Squre index={item}
                                      value={curState[item]}
                                      key={item}
                                      gameState={this.props.gameState}
                                      onClick={() => this.handleClick(item)}
                        />;
                    })
                }
            </div>
        );
    }

    handleClick (i) {
        const squares = this.state.squares.slice();
        squares[i] = this.props.gameState.next;
        this.setState({
            squares
        });
    }

    render () {
        const arr = [0, 3, 6];
        return (
            <div className="board-box">
                {
                    arr.map((item) => {
                        return this.renderRow(item, 3, this.state);
                    })
                }
            </div>
        );
    }
}

export default Board;