/**
 * Created by jfhuang on 17/6/18.
 */
import React, { Component } from 'react';
import Board from './Board';

import '../css/TicTacToe.css';

class Game extends Component {
    constructor () {
        super();
        this.state = {
            start: false,
            next: '',
            winner: ''
        };
    }

    render () {
        return (
            <div className="game-box">
                <Board gameState={this.state}/>
                <div className="game-handle">
                    <p>下一个操作者:{this.state.next}</p>
                    <p>赢家:{this.state.winner}</p>
                    <p><a href="javascript:void(0);" onClick={() => {
                        this.setState({
                            start: true,
                            next: 'X'
                        });
                    }}>开始游戏</a></p>
                </div>
            </div>
        );
    }

    onToStart () {
        this.setState({
            start: true
        });
    }

    onToStop () {
        this.setState({
            start: false
        });
    }

}

export default Game;