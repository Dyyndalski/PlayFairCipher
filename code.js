function toEncryption() {
    document.getElementById('result').value = "";
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let textToChange = document.getElementById("data").value;
    let code = document.getElementById("key").value;
    code = code.toLowerCase();
    code = code.replaceAll(" ", "");

    if(code.length == 0 || textToChange.length == 0){
        window.alert("Pola nie mogą być puste");
        return 0;
    }

    textToChange = textToChange.replaceAll(new RegExp(/[^A-Za-z]+/g), ""); 
    textToChange = textToChange.toLowerCase();

    let result = encryption(textToChange, code, alphabet);

    console.log(result);
    document.getElementById('result').value = "";
    document.getElementById('result').value = result.join("");

  }

function toDescryption() {
    document.getElementById('result').value = "";
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let textToChange = document.getElementById("data").value;
    let code = document.getElementById("key").value;

    
    if(code.length == 0 || textToChange.length == 0){
        window.alert("Pola nie mogą być puste");
        return 0;
    }
    

    var result = decryption(textToChange, code, alphabet);
    result = result.join("");
    document.getElementById('result').value = result;
}

function clearFunction(){
    deleteTable();
    document.getElementById('key').value = "";
    document.getElementById('data').value = "";
    document.getElementById('result').value = "";

}

function decryption(textToUncode, code, alphabet){
    var matrix = new Array();
    let uniqueText = [...new Set(code)];

    matrix = writeKeyIntoMatrix(matrix, uniqueText, alphabet);

    deleteTable();
    drawTable(matrix, code);

    matrix = sliceIntoChunks(matrix, 5);

    textToUncode = textToUncode.split("");
    console.log(matrix);

    return deCoding(textToUncode, matrix);
}

function encryption(textToCode, code, alphabet){
    var matrix = new Array();
    let uniqueText = [...new Set(code)];
    
    textToCode = textToCode.replaceAll("j", "i");
    matrix = writeKeyIntoMatrix(matrix, uniqueText, alphabet);

    deleteTable();
    drawTable(matrix, code);

    matrix = sliceIntoChunks(matrix, 5);

    textToCode = textToCode.split("");
    return coding(textToCode, matrix);
}

function deleteTable(){
    let keyTable = document.getElementById('codeTable2');

    if(document.body.contains(keyTable)){
        document.getElementById('codeTable2').remove();
    }
}


function drawTable(matrix, code){
    let table = document.createElement('table');
    table.setAttribute('id', 'codeTable2');
    document.getElementById('codeTable').appendChild(table);
    let tr = document.createElement('tr');
    table.appendChild(tr);

    for(let i = 0; i < code.length; i++){
        if(i % 5 == 0){
            tr = document.createElement('tr');
            table.append(tr);
        }
        let fieldOfTable = document.createElement('td');
        fieldOfTable.setAttribute('style', 'color:green');
        let text = matrix[i].fontcolor("green");
        fieldOfTable.innerHTML = matrix[i];
        tr.appendChild(fieldOfTable);
    }


    for(let i = code.length; i < 25; i++){
        if(i % 5 == 0){
            tr = document.createElement('tr');
            table.append(tr);
        }
        let fieldOfTable = document.createElement('td');
        fieldOfTable.innerHTML = matrix[i];
        tr.appendChild(fieldOfTable);
    }
}



function deCoding(textToCode, matrix){
    let coded = [];
    for (let i = 0; i < textToCode.length; i += 2) {
        let firstLetter = findXY(textToCode[i], matrix);
        let secondLetter = findXY(textToCode[i+1], matrix);

        console.log(textToCode);
        console.log(matrix);
        console.log("1 " + firstLetter + " 2 " + secondLetter);


        if (firstLetter[0] == secondLetter[0]) {
            coded.push(matrix[firstLetter[0]][(firstLetter[1]-1+5)%5]);
            coded.push(matrix[secondLetter[0]][(secondLetter[1]-1+5)%5]);
        }
        else if (firstLetter[1] == secondLetter[1]) {
            coded.push(matrix[(firstLetter[0]-1+5)%5][firstLetter[1]]);
            coded.push(matrix[(secondLetter[0]-1+5)%5][secondLetter[1]]);
        }
        else{
            coded.push(matrix[firstLetter[0]][secondLetter[1]]);
            coded.push(matrix[secondLetter[0]][firstLetter[1]]);
        }
    }
    return coded;
}

function coding(textToCode, matrix){
    let coded = [];
    let firstLetter;
    let secondLetter;

    for (let i = 0; i < textToCode.length; i++) {

        if(i == textToCode.length-1){
            firstLetter = findXY(textToCode[i], matrix);
            secondLetter = findXY("x", matrix);
        }else if(textToCode[i] != textToCode[i+1]){
            firstLetter = findXY(textToCode[i], matrix);
            secondLetter = findXY(textToCode[i+1], matrix);
            i++;
        }else{
            firstLetter = findXY(textToCode[i], matrix);
            secondLetter = findXY("x", matrix);
        }

    
        if (firstLetter[0] == secondLetter[0]) {
            coded.push(matrix[firstLetter[0]][(firstLetter[1]+1)%5]);
            coded.push(matrix[secondLetter[0]][(secondLetter[1]+1)%5]);
        }else if (firstLetter[1] == secondLetter[1]) {
            coded.push(matrix[(firstLetter[0]+1)%5][firstLetter[1]]);
            coded.push(matrix[(secondLetter[0]+1)%5][secondLetter[1]]);
        }else{
            coded.push(matrix[firstLetter[0]][secondLetter[1]]);
            coded.push(matrix[secondLetter[0]][firstLetter[1]]);
        }
    }
    return coded;
}


function writeKeyIntoMatrix(matrix, uniqueText, alphabet){
    var counter = 0;
    for (var i = 0; i < 25; i++) {
        if (i < uniqueText.length) {
            let item = uniqueText[i];
            matrix.push(item);
            removeFromArray(item, alphabet);
        } else {
            matrix.push(alphabet[counter]);
            counter++;
    }
    }
    return matrix;   
}

function findXY(toFind, matrix) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === toFind) {
                return [i, j];
            }
        }
    }
    return null;
}

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function removeFromArray(item, alphabet){
    for( var i = 0; i < alphabet.length; i++){ 
        if ( alphabet[i] === item) { 
            alphabet.splice(i, 1); 
        }
    }
}


