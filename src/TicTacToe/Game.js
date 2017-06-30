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
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    render () {
        let status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        const current = this.state.history[this.state.stepNumber].squares;
        const winner = calculateWinner(current);
        if (winner) {
            status = `Winner:${winner}`;
        }
        const moves = this.state.history.map((step, move) => {
            const desc = move ? "Move #" + move : "Game start";
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="game-box">
                <Board
                    squares={current}
                    xIsNext={this.state.xIsNext}
                    onClick={(i) => { this.handleClick(i) }}
                />
                <div className="game-handle">
                    <p>{status}</p>
                    <ul>
                        {moves}
                    </ul>
                </div>
            </div>
        );
    }

    handleClick (i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: this.state.history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

}


function calculateWinner (squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;