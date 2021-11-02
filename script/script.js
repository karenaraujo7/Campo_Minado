const bomba = '💣'; 



function field(linhas, colunas, minas) {
    let celulas = [];
    for (let i = 0; i < linhas;  i++) {
        let rows = []; //linhas vazias
        celulas.push(rows);
        for( let j = 0; j < colunas; j++) {
            let cols = [];
            rows.push(cols);
            if (minas.map(currentElement => JSON.stringify(currentElement)).includes('['+i+','+j+']')) {
                celulas[i][j] = bomba;
            } else {
                celulas[i][j] = 0;
            }

            if (celulas[i][j] != bomba) {
               
                if (celulas[i - 1] !== undefined && celulas[i-1][j-1] === bomba) {
                    celulas[i][j]++;
                } 
                if (celulas[i - 1] !== undefined && celulas[i-1][j] === bomba){
                    celulas[i][j]++;
                } 
              
                if (celulas[i-1] !== undefined && celulas[i-1][j+1] === bomba) {
                    celulas[i][j]++;
                }

                if (celulas[i][j-1] === bomba)  {
                    celulas[i][j]++;
                }
                if (celulas[i][j+1] === bomba) {
                    celulas[i][j]++;
                }

                if (celulas[i+1] !== undefined && celulas[i+1][j-1] === bomba){
                    celulas[i][j]++;
                } 
                if (celulas[i+1] !== undefined && celulas[i+1][j] === bomba) {
                    celulas[i][j]++;
                }
                if (celulas[i+1] !== undefined && celulas[i+1][j+1] === bomba){
                    celulas[i][j]++;
                }
          }
        }
    }
        return celulas;
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