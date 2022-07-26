
window.onload = function() {
    setGame();
}

var numselected = null;
var tileselected = null;

function selectNumber(){
    if(numselected != null){
        numselected.classList.remove("box-def");
        numselected.classList.add("box-usr");
    }
    numselected = this;
    numselected.classList.add("box-def");
    numselected.classList.remove("box-usr");
}

function checkTiles() {
    return;
    for (let i = 0 ; i < 10 ; i++) {
        for (let j = 0 ; j < 10 ; j++) {
            curtile = document.getElementById(i+"x"+j);
            for(let r = i ; r < 10 ; r++) {
                for(let c = j ; c < 10 ; c++) {
                    if (r!= i || c != j) {
                        tile = document.getElementById(r+"x"+c);
                        if (tile.innerText == curtile.innerText) {
                            tile.classList.add("box-wrong");
                            curtile.classList.add("box-wrong");
                        } else {
                            if(tile.classList.contains("box-wrong")){
                                tile.classList.remove("box-wrong");
                            }
                        }
                    }
                }
            }
        }
    }

    grid_row = (row / 3) * 3;
    grid_col = (col / 3) * 3;
    for (r = 0 ; r < 3 ; r++) {
        for (c = 0 ; c < 3 ; c++) {
            if (row != r+grid_row || col != c+grid_col){
                tile = document.getElementById(r+grid_row+"x"+c+grid_col);
                if (tile.innerText && tile.innerText == this.innerText) {
                    tile.classList.add("box-wrong");
                    this.classList.add("box-wrong");
                }
            }
        }    
    }
}

function checkGameFininsh() {
    var rows = "";
    // var cols = ["", "", "", "", "", "", "", "", ""];
    for (r = 1 ; r < 10 ; r++) {
        rows = "";
        for (c = 1 ; c < 10 ; c++) {
            tile = document.getElementById(r+"x"+c);
            if(tile.innerText == null) { 
                return;
            }
            rows += tile.innerText;
        }    
        if (rows !=sln[r-1]) {
            return;
        }
    }

    title = document.getElementById("title");
    title.innerText = "SUDOKU Solved";
    for (r = 1 ; r < 10 ; r++) {
        for (c = 1 ; c < 10 ; c++) {
            tile = document.getElementById(r+"x"+c);
            if (tile.classList.contains("box-usr")) {
                tile.classList.add("box-def");
                tile.classList.remove("box-usr");
            }
        }
    }    
}

function selectTile(){
    if(numselected && this.classList.contains("box-usr")) {
        this.innerText = numselected.id;
        row = this.id.split('x')[0];
        col = this.id.split('x')[1];
        this.innerText = numselected.id;// + row + col;
        checkTiles();
        checkGameFininsh();
    }
}

var qn=["861--3254",
        "--3-4---6",
        "-----8---",
        "-----4--7",
        "--2-8-9--",
        "6--1-----",
        "---4-----",
        "4---1-7--",
        "-5-6--439"];

var sln = ["861793254",
            "923541876",
            "547268193",
            "385924617",
            "712386945",
            "694157328",
            "276439581",
            "439815762",
            "158672439"];

function setGame() {
    for(let i = 1 ; i < 10 ; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click",selectNumber);
        number.classList.add("box");
        number.classList.add("box-usr");
        document.getElementById("digits").appendChild(number);
    }

    for(let i = 1 ; i < 10 ; i++) {
        var row = qn[i-1];
        for(let j = 1; j < 10 ; j++) {
            let number = document.createElement("div");
            number.id = i+"x"+j;
            var num = row[j-1];
            if (num != "-") {
                number.innerText = num;
                number.classList.add("box-def");
            } else {
                number.classList.add("box-usr");
            }
            number.classList.add("box");
            document.getElementById("board").appendChild(number);
            number.addEventListener("click",selectTile);
            if (j == 3 || j == 6) {
                let line = document.createElement("hr");
                line.classList.add("vline");
                document.getElementById("board").appendChild(line);
            }
        }

        if(i == 3 || i == 6) {
            let line = document.createElement("hr");
            line.classList.add("hline");
            document.getElementById("board").appendChild(line)
        }
    }
}