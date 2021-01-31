cellular = [];
gen = 0;
rowSize = 0;
columnSize = 0;
toggleSound = new Audio("/audio/toggle.wav");
startSound = new Audio("/audio/start.wav");
renderSound = new Audio("/audio/render.wav");


document.addEventListener("keydown", function (event) {

    switch (event.key) {
        case "s":
            tableCreate();
            break;
        case "r":
            render();
            break;
        default: 
    }
});
 






function tableCreate() {
    cellular = [];
    gen = 0;
    panel = document.getElementById("panel");
    panel.innerHTML = "";
    
    
    tbl = document.createElement('table');
    rowSize = document.getElementById("rowSize").value;
    columnSize = document.getElementById("columnSize").value;
   

    for(var i = 0; i < rowSize; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < columnSize; j++){
            var cellId = i * columnSize + j;
            var td = tr.insertCell();
            td.setAttribute("id", cellId);
            // td.setAttribute("onClick", "toggle(this.id);");
            td.addEventListener("click", function () { toggle(this.id) });
            td.addEventListener("mouseenter", function (event) { console.log(event.target); animate(event.target) });
            
            var parms = [[i, j], [], false, [], 0];
            if (document.getElementById("autoSeed").checked) {
                parms[1][0] = 0.7 < Math.random();

            } else { parms[1][0] = false;}
            parms[3] = nfinder(parms[0]);
            if (parms[1][gen]) {
                td.className = "alive";
            }
            cellular[cellId] = parms
            
            
        }
    }
    panel.appendChild(tbl);
    startSound.play();


}

function nfinder (vars) {
    
    x = vars[0];
    y = vars[1];
        
    var neighbours = [];
    
    
    for (var x2 = (x-1); x2 < (x + 2); x2++) {
        for (var y2 = (y - 1); y2 < (y + 2); y2++) {
            if ( (-1 < x) && (x <= rowSize-1) && (- 1 < y) && (y <= columnSize-1) && (x != x2 || y != y2) && (0 <= x2) &&  (x2<= rowSize-1) && (0 <= y2) && (y2<= columnSize-1)) {
                var indx = (columnSize * x2) + y2 
                neighbours.push(Number("" + indx));
            }
        }
    }
    
    
    return neighbours;

}



function render() {
    renderSound.play();
    for (var i = 0; i < cellular.length; i++) {
        cellular[i][4] = aliveFinder(cellular[i][3]);
        aliveNeighbours = cellular[i][4];

        if (cellular[i][1][gen]) {
            if (aliveNeighbours < 2) {
                cellular[i][1].push(false);
                document.getElementById(i).className = "dead";
            } else if (aliveNeighbours < 4) {
                cellular[i][1].push(true);
            
            } else if (aliveNeighbours > 3) {
                cellular[i][1].push(false);
                document.getElementById(i).className = "dead";
            
            }
        } else if (!cellular[i][1][gen]) {
            if (aliveNeighbours === 3) {
                cellular[i][1].push(true);
                document.getElementById(i).className = "alive";
            }else {cellular[i][1].push(false);}
        }
    }
    gen++
    
}




function aliveFinder(vars) {
    
    var alive = 0
    
    for (var i = 0; i < vars.length; i++) {
        var neighbour = vars[i]; 
        if (cellular[neighbour][1][gen]) {
            alive++;
        }
    }
    
    return alive;
}


function toggle(cellId) {

    if (cellular[cellId][1][gen]) {
        cellular[cellId][1][gen] = false;
        document.getElementById(cellId).className = "dead";
    } else if (!cellular[cellId][1][gen]) {
        cellular[cellId][1][gen] = true;
        document.getElementById(cellId).className = "alive";
    }
    toggleSound.play();
} 



function animate(cell) {
    console.log(cell.tagName)

        // cell.classList.add("hover")
        // cell.appendChild(document.createTextNode(cell.id));
        cell.style.backgroundColor = "red";
        cell.addEventListener("mouseleave", function (event) { cell.style.backgroundColor = ""; });
        // setTimeout(function () {
        //     cell.classList.remove("hover")
        // },10)
    
    
    
}