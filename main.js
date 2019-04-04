class Main {
    constructor(dozens, total_games) {
        this._dozens = dozens;
        this._total_games = total_games;
    }

    get dozens() {
        return this._dozens;
    }

    set dozens(newDozens) {
        this._dozens = newDozens;
    }

    get result() {
        return this._result;
    }

    set result(newResult) {
        this._result = newResult;
    }

    get total_games() {
        return this._total_games;
    }

    set total_games(newTotalGames) {
        this._total_games = newTotalGames;
    }

    get games() {
        return this._games;
    }

    set games(newGames) {
        this._games = newGames;
    }
}

let numeros_ignorados = [0];
let dezenas = [];
let gen = new Main();

function gerarNumero(existentes) {
    let novoNumero = parseInt(Math.random() * 59, 10) + 1;
    if (existentes.indexOf(novoNumero) != -1 || numeros_ignorados.indexOf(novoNumero) != -1) novoNumero = gerarNumero(existentes);
    return novoNumero;
}

function chaveExistente(chave) {
    let chaves = dezenas.map(function (chv) {
        return chv.join();
    });
    return chaves.indexOf(chave.join()) != -1;
}

function gerarDezenas() {
    dezenas = [];
    for (let i = 0; i < gen.dozens; i++) {
        let numeros = [];
        while (numeros.length < 10) {
            numeros.push(gerarNumero(numeros));
        }
        numeros = numeros.sort(function(a, b){return a-b});
        chaveExistente(numeros) ? gen.dozens++ : dezenas.push(numeros);
    }
    return dezenas;
}

function gerarJogos() {
    let jogos = [];
    for (let i = 0; i < gen.total_games; i++) {
        jogos.push(gerarDezenas());
    }
    gen._games = jogos;
}

function gerarSorteio() {
    let arr = [];
    let count = 6
    for (let i = 0; i < count; i++) {
        let numeros = [];
        while (numeros.length < 10) {
            numeros.push(gerarNumero(numeros));
        }
        numeros = numeros.sort(function(a, b){return a-b});
        chaveExistente(numeros) ? count++ : arr.push(numeros);
    }
    gen._result = arr;
    if(gen.games.indexOf(arr) > -1) {
        gerarTabelaHTMLResultado();
    }
}

function gerarTabelaHTMLJogos () {
    let elementTable = document.getElementById("row-table");
    let count = 0;
    for(let obj of gen.games) {
        count++;
        elementTable.innerHTML += `<tr id="jogo-${count}"><td>Jogo ${count}:</td></tr>`;
        for(item of obj) {
            let tr = document.getElementById(`jogo-${count}`);
            tr.innerHTML += `<td>${item}</td>`;
        }
    }
}

function gerarTabelaHTMLResultado () {
    let elementTable = document.getElementById("row-table-sorteio");
    let count = 0;
    for(let obj of gen.result) {
        count++;
        elementTable.innerHTML += `<tr id="sorteio-${count}"></tr>`;
        for(item of obj) {
            let tr = document.getElementById(`sorteio-${count}`);
            tr.innerHTML += `<td>${item}</td>`;
        }
    }
}

function Gerar() {
    document.getElementById("row-table").innerHTML = "";
    document.getElementById("row-table-sorteio").innerHTML = "";
    let qtd_jogos = parseInt(document.getElementById("qtd_jogos").value);
    let qtd_dezenas = parseInt(document.getElementById("qtd_dezenas").value);
    if(qtd_dezenas < 6 || qtd_dezenas > 10) {
        document.getElementById("msgError").style.display = "block";        
    } else {
        document.getElementById("msgError").style.display = "none";        
        gen = new Main(qtd_dezenas, qtd_jogos);
        gerarJogos();
        gerarSorteio();
        gerarTabelaHTMLJogos();
    }
}