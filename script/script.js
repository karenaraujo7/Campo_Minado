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


function drawTable(rows) {
    let table = document.getElementById('campo');
    for (let linha of rows) {
        let tr = document.createElement('tr');
        for (let col of linha) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.setAttribute('class', 'invisivel')
            span.textContent = col;
            td.appendChild(span);
            tr.appendChild(td);
            td.addEventListener('click', mostrar)
        }
        table.appendChild(tr);
    }
}

function mostrar(event) {
    if (event.target.textContent === bomba) {
       
        for(let elemento of document.querySelectorAll('span')) {
            elemento.setAttribute('class', 'visible')
        }
        divOver.innerHTML += '<h2>Game Over</h2> <button type="button" id="start-again" onclick="play()">Start Again</button>'

    } else {
        event.target.childNodes[0].setAttribute('class', 'visible')
    }
}

let divOver = document.getElementById('game-over')
function play() {
    window.location.reload();
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

let minas = mines(15, 10, 10); 
let campo = field(10, 10, minas)
drawTable(campo)