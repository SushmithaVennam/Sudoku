var qn=["861--3254",
        "--3-4---6",
        "-----8---",
        "-----4--7",
        "--2-8-9--",
        "6--1-----",
        "---4-----",
        "4---1-7--",
        "-5-6--439"];

// var qn = ["86-793254",
//         "923541876",
//         "547268193",
//         "385924617",
//         "712386945",
//         "694157328",
//         "276439581",
//         "439815762",
//         "158672439"];

var sln = ["861793254",
            "923541876",
            "547268193",
            "385924617",
            "712386945",
            "694157328",
            "276439581",
            "439815762",
            "158672439"];           
            
window.onload = function() {
    setGame();
}

function setGame() {
    for(let i = 1 ; i < 10 ; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
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
    checkNumbersToDisable();
}

var numselected = null;
var tileselected = null;

function selectNumber(){
    if ("box-dis" in this.classList) {
        return;
    }

    if(numselected != null){
        numselected.classList.remove("box-def");
        numselected.classList.add("box-usr");
    }
    numselected = this;
    numselected.classList.add("box-def");
    numselected.classList.remove("box-usr");
}

function checkNumbersToDisable() {
    var rows = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (r = 1 ; r < 10 ; r++) {
        for (c = 1 ; c < 10 ; c++) {
            tile = document.getElementById(r+"x"+c);
            if(tile.innerText != null) { 
                rows[parseInt(tile.innerText)]++;
            }
        }
    }

    for (let i = 1 ; i < 10 ; i++) {
        number = document.getElementById(i);
        if(rows[i] == 9) {
            number.classList.add("box-dis")
            number.classList.remove("box-def")
        } else {
            if ("box-dis" in number.classList) {
                number.classList.remove("box-dis")
                number.classList.add("box-def")
            }
        }
    }
}

function checkGameFininsh() {
    var rows = "";
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
    if (numselected == null) {
        return;
    }

    if(this.classList.contains("box-def")) {
        return;
    }

    this.innerText = numselected.id;
    checkNumbersToDisable();
    checkGameFininsh();
}

