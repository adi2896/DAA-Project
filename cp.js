var sudoku = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0]];

 var sudoku_possibilites = [[111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111],
 [111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111],
 [111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111],
 [111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111],
 [111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111],
 [111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111],
 [111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111],
 [111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111],
 [111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111, 111111111]]

var size = sudoku.length;

function compute(){
    getData();
    inputValidityCheck();
    constraint_prop();
    // backtrackSolver();
    display();
}

function display(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            document.getElementById(`cell${i}${j}`).value = sudoku[i][j];
        }
    }
}

function initialize(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            document.getElementById(`cell${i}${j}`).value = 0;
            sudoku[i][j] = 0;
        }
    }
    document.getElementById("validity").innerHTML = "";
}

function getData(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            sudoku[i][j] = parseInt(document.getElementById(`cell${i}${j}`).value, 10);
        }
    }

    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
          if(parseInt(document.getElementById(`cell${i}${j}`).value, 10) !== 0)
            sudoku_possibilites[i][j] = 0;
        }
    }
}

function validityCheck(arg)
{
    let row = arg.i;
    let col = arg.j;
    let tnum = arg.num;

    for(let j = 0; j < size; j++){
        if(sudoku[row][j] === tnum && col !== j){
            return false;
        }
    }

    for(let i = 0; i < size; i++){
        if(sudoku[i][col] === tnum && row !== i){
            return false;
        }
    }

    let gridX = Math.floor(col/3);
    let gridY = Math.floor(row/3);


    for(let gi = (gridY * 3); gi < ((gridY*3) + 3); gi++){
        for(let gj = (gridX * 3); gj < ((gridX*3) + 3); gj++){
            if(sudoku[gi][gj] === tnum && (row !== gi && col !== gj)){
                return false;
            }
        }
    }

    return true;
}

function inputValidityCheck(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            if(sudoku[i][j] !== 0){
                if(!validityCheck({i:i, j:j, num:sudoku[i][j]})){
                    document.getElementById("validity").innerHTML = "Not valid";
                    return false;
                }
            }
        }
    }
    document.getElementById("validity").innerHTML = "";
}


function emptyCellFinder(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            if (sudoku[i][j] === 0){
                return {i:i, j:j};
            }
        }
    }

    return false;
}

function findEmptyCell_poss(possibilities)
{
        let res = null;
        for (let i = 0; i < size; i++)
        {
            for (let j = 0; j < size; j++)
            {
                if (sudoku_possibilites[i][j] === 0)
                {
                    let count = bitCount(sudoku_possibilites[i][j]);
                    if (count === possibilities)
                    {
                        res = {i:i, j:j, values:[]};
                        for (let n = 1; n <= size; n++)
                        {
                            if ((sudoku_possibilites[i][j] & (1 << n)) > 0)
                                res.values.push(n);
                        }
                        return res;
                    }
                }
            }
        }
        return res;
}

function setval (args)
{
      let row = arg.i;
      let col = arg.j;
      let tnum = arg.value;
      let newbit = 1 << tnum;
      let updatebit = ~newbit;
      sudoku_possibilites[row][col] = newbit;
      sudoku[row][col] = updatebit;
      let gridX = Math.floor(col/3);
      let gridY = Math.floor(row/3);

      for(let gi = (gridY * 3); gi < ((gridY*3) + 3); gi++){
          for(let gj = (gridX * 3); gj < ((gridX*3) + 3); gj++){
              if(row !== gi || col !== gj)
              {
                  sudoku_possibilites[bi][bj] &= updatebit;
              }
          }
      }

      for(let j = 0; j < size; j++){
          if(col !== j){
              sudoku_possibilites[row][j] &= updatebit;
          }
      }

      for(let i = 0; i < size; i++){
        if(row !== i){
            sudoku_possibilites[i][col] &= updatebit;
        }
      }

  }

function backtrackSolver(){
    let eCell = emptyCellFinder();
    if(!eCell){
        return true;
    }else{
        for(let i = 1; i < 102; i++){
            eCell.num = i;
            if(validityCheck(eCell)){
                sudoku[eCell.i][eCell.j] = eCell.num;
                //console.log(`sudoku[${eCell.i}][${eCell.j}] = ${sudoku[eCell.i][eCell.j]}`);
                if(backtrackSolver()){
                    return true;
                }
                sudoku[eCell.i][eCell.j] = 0;
            }


        }

        return false;
    }
}

function constraint_prop()
{
  let eCell = findEmptyCell_poss(1);
  while (eCell != null) {
      setval({i:eCell.i, j:eCell.j, value:eCell.values[0]});
      eCell = findEmptyCell_poss(1);
  }

  for (cellChoices = 2; cellChoices <= size; cellChoices++)
  {
      eCell = findEmptyCell_poss(cellChoices);
      if (eCell != null)
          break;
  }
  if (eCell != null)
  {
      for (var cellVal of cell.values)
      {
          setval({i:eCell.i, j:eCell.j, value:cellVal});
          return constraint_prop();
      }
      return false;
  }
  else
  {
      return true;
  }
}