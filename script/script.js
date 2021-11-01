const bomba = '💣'; 

function field(linhas, colunas, minas) {
    let rows = []; //linhas vazias
    
    for (let i = 0; i < linhas; i++) {
        rows[i] = []; //linha vazia no indice
        for( let j = 0; j < colunas; j++) {
            if (minas.map(currentElement => JSON.stringify(currentElement)).includes("["+i+","+j+"]")) {   // verificar se o par de array existe no array de minas,
                rows[i][j] = bomba;
            } else {
                rows[i][j] = 0;
            }
        }
        //return rows[i][j];
    }

    // * * * -> [i-1,j-1] [i-1,j] [i-1,j+1]
    // * * * -> [i,  j-1] [i,  j] [i,  j+1]
    // * * * -> [i+1,j-1] [i+1,j] [i+1,j+1]


    
    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            if (rows[i][j] !== bomba) { 
                 if (rows[i - 1] !== undefined && rows[i - 1][j - 1] === bomba) rows[i][j]++; 
                 if (rows[i - 1] !== undefined && rows[i - 1][j] === bomba) rows[i][j]++;
                 if (rows[i - 1] !== undefined && rows[i - 1][j + 1] === bomba) rows[i][j]++;

                 if (rows[i][j - 1] === bomba) rows[i][j]++;
                 if (rows[i][j + 1] === bomba) rows[i][j]++;

                 if (rows[i + 1] !== undefined && rows[i + 1][j - 1] === bomba) rows[i][j]++;
                 if (rows[i + 1] !== undefined && rows[i + 1][j] === bomba) rows[i][j]++;
                 if (rows[i + 1] !== undefined && rows[i + 1][j + 1] === bomba) rows[i][j]++;
            }
        }
        return rows;
    }   
}

function drawTable(linhas) {
    let table = document.getElementById('campo');
    for (let row of linhas) {
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

let minas = [[0,1], [3,2]]
let myField = field(11, 11, minas)
drawTable(myField)