import React from 'react';
import './index.css';
import  Square from './square'


class Board extends React.Component {

    renderSquare(i) {
        return(
            <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            />
        );
    }

    createTable(props){
        let board  = []
        let count = 0
         for (let i = 0; i < parseInt(this.props.input); i++) { //ใส่ข้อมูลจาก user
            let row = []
            for (let j = 0; j < parseInt(this.props.input); j++) { //ใส่ข้อมูลจาก user
                row.push(
                    this.renderSquare(count)
                )
                count += 1
            }
            board.push(<div className="board-row">{row}</div>)
        }
        return board
    }

    render() {
        return (
            <div>
                {this.createTable()}
            </div>
        );
    }
}

export default Board;