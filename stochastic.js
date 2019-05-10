let fixed_values = [];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function find(i, j){
    for(let x = 0; x < fixed_values.length; x++){
        if(fixed_values[x].i == i  && fixed_values[x].j == j){
            return true;
        }
    }
    return false;
}

function generate_board(original_board, size, fixed)
{
    board = deepcopy_board(original_board);
    let choices = new Array(size);
    for(let i=0;i<10;i++)
    {
      let choice_row = new Array(size);
      for(let j=0;j<10;j++)
      {
          choice_row.push(j+1);
      }
      choices.push(choice_row);    
    }

    for(let i=0;i<10;i++)
    {
      for(let j=0;j<10;j++)
      {
        if(!find(i,j))
        {
        choice[i].splice(choice[i].indexOf(fixed[i][j]), 1 );
        }
      } 
    }

    for(let i=0;i<10;i++)
    {
      for(let j=0;j<10;j++)
      {
        if(!find(i,j))
        {
          index = getRandomInt(0,choice[i].length-1)
          board[i][j] = choices[i][index];
          choice[i].splice(choice[i].indexOf(index), 1 );
        }
      } 
    }
return {board: board, collision: 0};
}

function generate_successor(board, size, fixed)
{
  let board = deepcopy_board(original_board);
  let row,index1,index2,choice1,choice2,temp;
  let choices = new Array(size);
  for(let i=0;i<10;i++)
  {
    let choice_row = new Array(size);
    for(let j=0;j<10;j++)
    {
      choice_row.push(j+1);
    }
    choices.push(choice_row);    
  }
  row = getRandomInt(0,size-1)
  index1 = getRandomInt(0,choice[row].length-1)
  choice1 = choices[row][index1]
  choice[row].splice(choice[row].indexOf(index1), 1 );
  index2 = getRandomInt(0,choice[row].length-1)
  choice2 = choices[row][index1]
  choice[row].splice(choice[row].indexOf(index2), 1 );
  temp = board[row][choice2];
  board[row][choice2] = board[row][choice1];
  board[row][choice1] =temp;
  return board;
}

function heuristic(board){
    let collisions = 0;
    // run collision check for each cell
    for(let i = o; i < size; i++){
        for(let j = 0; j < size; j++){
            let val = board.board[i][j];
            // check row for collisions
            for(let n = 0; n < size; n++){
                if (n != i && board.board[n][j] == val){
                    collisions += 1;
                }
            }
            // check column for collisions
            for(let m = 0; m < size; m++){
                if (m != j && board.board[i][m] == val){
                    collisions += 1;
                }
            }

            // check block for collisions
            let gridX = Math.floor(col/3);
            let gridY = Math.floor(row/3);
            
            
            for(let gi = (gridY * 3); gi < ((gridY*3) + 3); gi++){
                for(let gj = (gridX * 3); gj < ((gridX*3) + 3); gj++){
                    if(board.board[gi][gj] === val && (row !== gi && col !== gj)){
                        collisions += 1;
                    }
                }
            }
        }
    }

    board.collisions = collisions;
}

function compare(a,b){
	if(a.collisions > b.collisions){
      return 1;
    }else if(a.collisions == b.collisions){
      return 0;
    }else {
      return -1;
    }
}

function solver( ){

    for(let i = 0; i < size; i++){
        for(let j = 0; i < size; j++){
            if(sudoku[i][j] != 0){
                fixed_values.push({i:i, j:j});
            }
        }
    }

    let solved = false;
    let solution = null;
    let boards = [];

    for(let x = 0; x < size; x++){
        board = generate_board(sudoku, 9, fixed_values);
        boards.push(board);
    }

    for(let y = 0; y < size; y++){
        heuristic(boards[y]);
    }

    while(!solved){
        boards.sort(compare);
        let tempBoard = boards[0];
        if (tempBoard.collisons == 0){
            solved = true;
            solution = tempBoard.board;
        }else{
            let successors = [];
            for(let z = 0; z < 3; z++){
                successors.push()
            }
        }  
    }



}