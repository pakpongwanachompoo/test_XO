function CalculateWinner(squares,inputsize) {
    let lines = [];
    let condition = [];
    
    // console.log(squares.length)
    // console.log(inputsize)

    //horizontal line
    for(let i = 0; i < squares.length; i++){
      condition.push(i)
      if(condition.length === inputsize){
        lines.push(condition)
        condition = []
      }
    }
    
    //vertical line
    for(let i = 0; i < inputsize; i++){
      for(let j = i; j < squares.length; j+=inputsize){
        condition.push(j)
        if(condition.length === inputsize){
          lines.push(condition)
          condition = []
        }
      }
    }

    //slash left 
    for(let i = 0; i < squares.length; i+=(inputsize+1)){
      condition.push(i)
      if(condition.length === inputsize){
        lines.push(condition)
        condition = []
      }
    }

    //slash right
    for(let i = inputsize-1; i < squares.length; i+=(inputsize-1)){
      condition.push(i)
      if(condition.length === inputsize){
        lines.push(condition)
        condition = []
      }
    }


    for (let i = 0; i < lines.length; i++) {
      let temp2 = []
      for(let j = 0; j < lines[i].length; j++){
        temp2.push(squares[lines[i][j]]) 
      }
      if(temp2.every((val, index) => val === "O")){
        return "O"
      }
      else if(temp2.every((val, index) => val === "X")){
        return "X"
      }
    }
    
    
    return null;
}
  export default CalculateWinner;