//Carrinho de compra
var carrinho = JSON.parse(localStorage.getItem('.carrinho')) || [];
var botoes = document.querySelectorAll('.carrinho');

botoes.forEach(function(botao, index) {
    botao.addEventListener('click', function() {
        var produto = botao.parentElement;
        var descElement = produto.querySelector('.nome');
        var nome = descElement ? descElement.textContent : '';
        var preco = parseFloat(produto.querySelector('.preco').textContent.replace('R$', ''));
        var imagem = produto.querySelector('img').src;

        //verifica se existe um select e, se existir, obtém o valor selecionado
        var select = produto.querySelector('select');
        if(select) {
            nome += 'Suco de ' + select.options[select.selectedIndex].value + ' - 1 Litro';
        }
        var sabor = select ? ' - ' + select.options[select.selectedIndex].value : '';
        var item = {
            nome: nome,
            preco: preco,
            imagem: imagem
        };
        
        //verifica se o item ja existe no carrinho
        var itemExistente = carrinho.find(function(i){
            return i.nome === item.nome;
        });

        if (itemExistente) {
            //se ja existe, atualiza a quantidade
            itemExistente.quantidade++;
        } else {
            //se o item não existe, adiciona ao carrinho
            item.quantidade = 1;
            carrinho.push(item);
        }

        //atualiza a quantidade total de itens no localStorage
        var quantidadeTotal = carrinho.reduce(function(total, item) {
            return total + item.quantidade;
        }, 0);
        localStorage.setItem('quantidade', quantidadeTotal);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Produto adicionado ao carrinho');

        //logs de depuração
        console.log('Item:', item);
        console.log('Carrinho:', carrinho);
    });
});

//limpando o carrinho
var botaoLimpar = document.querySelector('.limpar-carrinho');
botaoLimpar.addEventListener('click', function() {
    localStorage.removeItem('carrinho');
    localStorage.removeItem('quantidade');

    carrinho = [];

    alert('Carrinho limpo com sucesso');
})
