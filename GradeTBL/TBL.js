const cells = document.querySelectorAll('input[type="text"]');

cells.forEach(cell => {
	cell.addEventListener('input', () => {
		const rowIndex = cell.parentElement.parentElement.rowIndex;
		const colIndex = cell.parentElement.cellIndex;
		const value = cell.value;
		console.log(`Cell (${rowIndex}, ${colIndex}) changed to ${value}`);
	});
});

var addRowBtn = document.getElementById("addRowBtn");
var addColumnBtn = document.getElementById("addColumnBtn");
var table = document.getElementById("myTable");
var colCount = table.rows[0].cells.length;

addRowBtn.addEventListener("click", function() {
    var newRow = table.insertRow(table.rows.length);//add row
    for (var i = 0; i < colCount; i++) {
        var cell = newRow.insertCell(i);
        var input = document.createElement("input");
        if (i == 0 || i == colCount - 1 || i==1) {
		    input.type = "text";
			if(i == 0 ||  i==1){
			input.style.width = "250px";}
			else{}
        } else {
            input.type = "number";
            input.max = "100";
            input.min = "0";
			input.style.width = "100px";
        }
        
        
        cell.appendChild(input);
    }
});


addColumnBtn.addEventListener("click", function() {
    if (colCount < 8) {
        var newTableName = "Assignment" + (colCount-2); 
        colCount++; 
        var headerRow = table.rows[0];
        var headerCell = headerRow.insertCell(colCount-2);
        headerCell.innerHTML = '<th colspan="1"><b>' + newTableName + '</b></th>'; 
        headerCell.style.backgroundColor = "lightblue";
        for (var i = 1; i < table.rows.length; i++) { 
            var row = table.rows[i]; 
            var cell = row.insertCell(colCount - 2); 
            var input = document.createElement("input"); 
            input.type = "number";
            input.min = "0"; 
			input.max = "100";
            var label = document.createElement("label"); 
            
            cell.appendChild(input); 
            if (cell.cellIndex == colCount - 3) { 
                if (row.rowIndex == 1) { 
                    cell.style.backgroundColor = "lightblue"; 
                }
            }
			input.style.width = "100px"; 
            cell.style.width = "100px"; 



			
			
        }
    }
});

var change = document.getElementById("changeresult");
var results = document.getElementById("Results");

change.addEventListener("click", function() {
  if (results.innerHTML === "Average[%]") {
    results.innerHTML = "Average[Letter]";
  } else if (results.innerHTML === "Average[Letter]") {
    results.innerHTML = "Average[4.0]";
  } else if (results.innerHTML === "Average[4.0]") {
    results.innerHTML = "Average[%]";
  }
});


