var sudoku = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0]];

var hard = [[0, 0, 0, 9, 0, 0, 5, 0, 0],
            [0, 4, 1, 0, 2, 0, 0, 0, 7],
            [0, 0, 0, 0, 1, 0, 0, 6, 4],
            [0, 0, 0, 3, 0, 0, 4, 0, 9],
            [6, 2, 0, 0, 0, 0, 0, 7, 3],
            [4, 0, 8, 0, 0, 2, 0, 0, 0],
            [8, 9, 0, 0, 3, 0, 0, 0, 0],
            [1, 0, 0, 0, 7, 0, 9, 3, 0],
            [0, 0, 3, 0, 0, 9, 0, 0, 0]];

var size = sudoku.length;
var bcount = 0;

function compute(){
    var t0 = performance.now();
    getData();
    if(inputValidityCheck()){
        backtrackSolver();
        display();
        var t1 = performance.now();
        document.getElementById("timer").innerHTML = "Execution time is " + (t1 - t0) + "ms";
        console.log("Execution time is " + (t1 - t0));
        console.log("Number of backtracks is " + bcount);
    }

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

function initializeHard(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            document.getElementById(`cell${i}${j}`).value = hard[i][j];
            
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
}

function validityCheck(arg){
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
    return true;
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

function backtrackSolver(){
    let eCell = emptyCellFinder();
    if(!eCell){
        return true;
    }else{
        for(let i = 1; i < 10; i++){
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

        bcount++;
        return false;
    }
}


