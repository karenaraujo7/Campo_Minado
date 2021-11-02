const bomba = '💣'; 

let rows = [];

function field(rows_count, cols_count, minas) {
    
    for (let i = 0; i < rows_count;  i++) {
        rows[i] = []; //linhas vazias
        for(let j = 0; j < cols_count; j++) {
            if (minas.map(currentElement => JSON.stringify(currentElement)).includes('['+i+','+j+']')) {
                rows[i][j] = bomba;
            } else {
                rows[i][j] = 0;
            }
        } 
    } 

    for (let i = 0; i < rows_count; i++){
        for (let j = 0; j < cols_count; j++){
            if (rows[i][j] != bomba) {  
                if (rows[i - 1] !== undefined && rows[i - 1][j - 1] === bomba) {
                    rows[i][j]++;
                }; 
                if (rows[i - 1] !== undefined && rows[i - 1][j] === bomba){
                    rows[i][j]++;
                }; 
                if (rows[i - 1] !== undefined && rows[i - 1][j + 1] === bomba) {
                    rows[i][j]++;
                };
   
                if (rows[i][j - 1] === bomba)  {
                    rows[i][j]++;
                };
                if (rows[i][j + 1] === bomba) {
                    rows[i][j]++;
                };
   
                if (rows[i + 1] !== undefined && rows[i + 1][j - 1] === bomba){
                    rows[i][j]++;
                }; 
                if (rows[i + 1] !== undefined && rows[i + 1][j] === bomba) {
                    rows[i][j]++;
                };
                if (rows[i + 1] !== undefined && rows[i + 1][j + 1] === bomba){
                    rows[i][j]++;
                }; 
            }    
        }
            
    }  
    return rows;    
}



function drawTable(colunas) {
    let table = document.getElementById('campo');
    for (let row of colunas) {
        let tr = document.createElement('tr');
        for (let col of row) {
            let td = document.createElement('td');
            //let span = document.createElement('span');
            //span.setAttribute('class', 'invisivel')
            td.textContent = col;
            //td.appendChild(span);
            tr.appendChild(td);
            //td.addEventListener('click', mostrar)
        }
        table.appendChild(tr);
    }
}

function mines(quantidade, linhas, colunas) {  //criação de um array de minas aleatorias 
    let minas = [];
    for(let i = 0; i < quantidade; i++) {
        let randomLine = parseInt(Math.random() * linhas)
        let randomCol = parseInt(Math.random() * colunas)
        minas.push([randomLine, randomCol])
    }
    return minas;
}

let minas = mines(30, 11, 11); 
let campo = field(10, 10, minas)
drawTable(campo)