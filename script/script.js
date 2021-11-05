const bomba = '💣'; 
let resultado = document.getElementById('resultado')
let elementosInvisiveis = document.getElementsByClassName('invisivel')

let rows = [];

function field(rows_count, cols_count, minas) {
    
    for (let i = 0; i < rows_count;  i++) {
        rows[i] = []; 
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
    vitoria();
    if (event.target.textContent === bomba) {
        
        resultado.classList.replace('invisivel2', 'visible')

        let audio = document.createElement('audio')
        audio.setAttribute('class', 'invisivel')

        resultado.innerHTML += '<audio autoplay src="./audio/explosao.mp3"></audio>'

        for(let elemento of document.querySelectorAll('span')) {
            elemento.setAttribute('class', 'visible')
        }
    } else {
        event.target.childNodes[0].setAttribute('class', 'visible')
    }
    
}

function play() {
    window.location.reload();
}

function mines(quantidade, linhas, colunas) { 
    let minas = [];
    for(let i = 0; i < quantidade; i++) {
        let randomLine = parseInt(Math.random() * linhas)
        let randomCol = parseInt(Math.random() * colunas)
        minas.push([randomLine, randomCol])
    }
    return minas;
}
 
function vitoria() {
    let h2 = document.getElementById('res')
    if (elementosInvisiveis.length === 10){
        h2.innerHTML = '<img class="resultado" src="./imagens/you-win1.png" alt="YOU WIN">'
        resultado.classList.replace('invisivel2', 'visible')
    }
}

let minas = mines(10, 9, 9);
let campo = field(9, 9, minas)
drawTable(campo)


