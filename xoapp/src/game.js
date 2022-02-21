import React from 'react';
import './index.css';
import Board from './board'
import CalculateWinner from './CalculateWinner';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            size: '',
            history: [{squares: Array().fill(null)}],
            stepNumber: 0,
            xIsNext: true,
            haveData: false, //เช็คว่ามีค่ารึยัง
            reRender: false
        };
    }
    
    
    handleChange(event) {
        if(this.state.haveData === false){
            this.setState({size: event.target.value});
        }
    }
    
    handleSubmit(event) {
        const Arraysize = parseInt(this.state.size)*parseInt(this.state.size) // n*n

        if(Number.isInteger(parseInt(this.state.size))){
            this.setState({haveData: true});
        }

        alert('Size was set: ' + this.state.size);
        this.setState({history:[{squares: Array(Arraysize).fill(null)}]})
        // console.log(this.state.size)
        event.preventDefault();
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        console.log(history)
        console.log(squares[i])

        if (CalculateWinner(squares,parseInt(this.state.size)) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
            squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

      
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = CalculateWinner(current.squares,parseInt(this.state.size));

        //console.log(current)
        //console.log(history)

        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (

            <div className="game">
                <div className="game-board">
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Set your size :
                    <input type="text" value={this.state.size} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <label>
                    ******************** Your board ************************
                </label>
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}   
                    input = {this.state.size} 
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;