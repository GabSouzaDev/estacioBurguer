//Adicionar os itens armazenados em LocalStorage na comanda
window.onload = function() {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    var comanda = document.querySelector('.comanda');
    var total = 0;

    //adiciona o pedido na comanda
    carrinho.forEach(function(item) {
        var itemElement = document.createElement('div');
        itemElement.classList.add('item');

        var quantidadeElement = document.createElement('span');
        quantidadeElement.classList.add('quantidade');
        quantidadeElement.textContent = item.quantidade + 'x';

        var nomeElement = document.createElement('span');
        nomeElement.classList.add('nome-pedido');
        nomeElement.textContent = item.nome;

        var precoElement = document.createElement('span');
        precoElement.classList.add('preco-pedido');
        precoElement.textContent = 'R$' + item.preco.toFixed(2);

        itemElement.appendChild(quantidadeElement);
        itemElement.appendChild(nomeElement);
        itemElement.appendChild(precoElement);
        comanda.appendChild(itemElement);

        total += item.preco * item.quantidade;
    });

    // Cria um contêiner para o total e o frete
    var totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');

    // Calcula o total e o frete
    var frete = total < 80 ? 15 : 0;
    var totalComFrete = total + frete;

    // Cria e adiciona os elementos de total e frete ao contêiner
    var totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.textContent = 'Total: R$' + total.toFixed(2);

    var freteElement = document.createElement('div');
    freteElement.classList.add('frete');
    freteElement.textContent = frete > 0 ? '+ Frete: R$' + frete.toFixed(2) : '+ Frete grátis';

    var totalComFreteElement = document.createElement('div');
    totalComFreteElement.classList.add('total-com-frete');
    totalComFreteElement.textContent = '= R$' + totalComFrete.toFixed(2);

    totalContainer.appendChild(totalElement);
    totalContainer.appendChild(freteElement);
    totalContainer.appendChild(totalComFreteElement);

    // Adiciona o contêiner de total ao final da comanda
    comanda.appendChild(totalContainer);
};
