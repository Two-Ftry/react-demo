/**
 * Created by jfhuang on 17/6/18.
 */
import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {

    // constructor () {
    //     super();
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true
    //     };
    // }

    // handleClick (i) {
    //     const squares = this.props.squares.slice();
    //     const winner = calculateWinner(this.props.squares);
    //     if (winner) {
    //         return;
    //     }
    //     squares[i] = this.props.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares,
    //         xIsNext: !this.props.xIsNext
    //     });
    // }

    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render () {
        // let status = 'Next Player: ' + (this.props.xIsNext ? 'X' : 'O');
        // const winner = calculateWinner(this.props.squares);
        // if (winner) {
        //     status = `Winner:${winner}`;
        // }
        return (
            <div className="board-box">
                {/*<div className="status">{status}</div>*/}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


export default Board;