/* Cronômetro de preparação do pedido */

// Pegando a quantidade de pedido solicitado e armazenado no localStorage
let quantidade = localStorage.getItem('quantidade');
let tempoPorItem = 3; // Cada item leva 3 minutos para ser preparado
let tempo = quantidade * tempoPorItem * 60; // Convertendo para segundos

// Inserindo os elementos na página
let cronometro;
let statusPedido = document.getElementById('statusPedido');
let displayCronometro = document.getElementById('displayCronometro');

function iniciarCronometro() {
    //verifica se o localStorage está vazio
    if (!quantidade || quantidade == 0) {
        statusPedido.innerText = "Você não fez o seu pedido ainda.";
        document.getElementById('gifStatus').src = 'assets/img/duvida.gif';
        document.getElementById('gifStatus').style.display='block';
        displayCronometro.style.display = 'none'; //esconde o cronometro
        //exibe o botão de retornar ao cardapio
        document.getElementById('displayBotao').style.display = 'block';
        return;        
    }
    statusPedido.innerText = "Seu pedido está sendo preparado...";
    document.getElementById('gifStatus').src = 'assets/img/preparo.gif';
    document.getElementById('gifStatus').style.display='block';
    cronometro = setInterval(() => {
        tempo--;
        let minutos = Math.floor(tempo / 60);
        let segundos = tempo % 60;
        //formatando o cronometro para minutos:segundos
        displayCronometro.innerText = `${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
        if (minutos < 5) {
            statusPedido.innerText = "Seu pedido já está a caminho do seu destino...";
            document.getElementById('gifStatus').src = 'assets/img/delivery.gif';
            document.getElementById('gifStatus').style.display='block';
        }
        if (tempo == 0) {
            pararCronometro();
            statusPedido.innerText = "Seu pedido chegou! Bom apetite!";
            document.getElementById('gifStatus').src = 'assets/img/chegou.gif';
            document.getElementById('gifStatus').style.display='block';
        }
    }, 1000);
}

function pararCronometro() {
    clearInterval(cronometro);
}

// Inicia o cronômetro assim que a página é carregada
window.onload = iniciarCronometro;
