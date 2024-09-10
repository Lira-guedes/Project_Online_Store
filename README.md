# Online Store
<h3>Projeto Front-End de E-commerce</h3>
<p>Este projeto é uma implementação de front-end de uma loja online, utilizando a API do Mercado Livre. O aplicativo permite que os usuários naveguem, pesquisem, visualizem detalhes dos produtos e gerenciem o carrinho de compras. Ele demonstra o uso do React para a construção de interfaces interativas, integração com APIs e gerenciamento de estado.</p>

<h3>Funcionalidades</h3>
<ul>
  <li><strong>Listagem de Produtos</strong>: Usuários podem navegar pelos produtos recuperados da API do Mercado Livre.</li>
  <li><strong>Funcionalidade de Busca</strong>: Pesquise produtos pelo nome usando a API do Mercado Livre.</li>
  <li><strong>Categorias de Produtos</strong>: Visualize produtos por categorias específicas.</li>
  <li><strong>Detalhes do Produto</strong>: Informações detalhadas de cada produto, acessíveis ao clicar em um item.</li>
  <li><strong>Carrinho de Compras</strong>: Adicione produtos ao carrinho e visualize o resumo da compra.</li>
  <li><strong>Finalização da Compra</strong>: Prossiga para a página de checkout para revisar o pedido.</li>
</ul>

<h3>Instalação</h3>
<ul>
  <li>Clone o repositório:
    <pre><code>git clone https://github.com/seu-usuario/ecommerce-projeto.git
cd ecommerce-projeto</code></pre>
  </li>
  <li>Instale as dependências:
    <pre><code>npm install</code></pre>
  </li>
  <li>Inicie o servidor de desenvolvimento:
    <pre><code>npm start</code></pre>
  </li>
</ul>

<h3>Estrutura do Projeto</h3>
<ul>
  <li><strong>App.js</strong>: Componente principal que define as rotas da aplicação utilizando <code>react-router-dom</code>. Inclui as seguintes rotas:
    <ul>
      <li><code>/</code> (Lista de Produtos)</li>
      <li><code>/Cart</code> (Carrinho de Compras)</li>
      <li><code>/ProductDetails/:id</code> (Detalhes do Produto)</li>
      <li><code>/Checkout</code> (Finalização da Compra)</li>
    </ul>
  </li>
  <li><strong>ProductList.jsx</strong>: Exibe uma lista de produtos buscados na API do Mercado Livre, permitindo que os usuários pesquisem e filtrem os produtos.</li>
  <li><strong>Cart.jsx</strong>: Gerencia a exibição dos produtos adicionados ao carrinho, onde os usuários podem visualizar os itens selecionados e prosseguir para a finalização.</li>
  <li><strong>api.js</strong>: Contém funções para interagir com a API do Mercado Livre, como:
    <ul>
      <li>Buscar categorias de produtos</li>
      <li>Pesquisar produtos por query ou categoria</li>
      <li>Recuperar detalhes específicos de um produto pelo ID</li>
    </ul>
  </li>
</ul>

<h3>Integração com a API</h3>
<p>Este projeto faz uso extensivo da API do Mercado Livre para buscar dados, como:</p>
<ul>
  <li>Categorias</li>
  <li>Produtos por pesquisa</li>
  <li>Produtos por categoria</li>
  <li>Detalhes do produto por ID</li>
</ul>

<h3>Como Usar</h3>
<ul>
  <li><strong>Navegar pelos Produtos</strong>: Na página inicial, os usuários podem navegar pelos produtos em diferentes categorias.</li>
  <li><strong>Pesquisar</strong>: Utilize a barra de busca para encontrar produtos específicos.</li>
  <li><strong>Ver Detalhes</strong>: Clique em um produto para visualizar suas informações detalhadas.</li>
  <li><strong>Adicionar ao Carrinho</strong>: Adicione produtos ao carrinho a partir da página de detalhes do produto.</li>
  <li><strong>Finalizar Compra</strong>: Revise os produtos no carrinho e finalize a compra.</li>
</ul>

<h3>Tecnologias Utilizadas</h3>
<ul>
  <li><strong>React</strong>: Para construir a interface do usuário.</li>
  <li><strong>React Router</strong>: Para navegação entre diferentes páginas.</li>
  <li><strong>Fetch API</strong>: Para fazer requisições à API do Mercado Livre.</li>
  <li><strong>CSS</strong>: Para estilização dos componentes.</li>
</ul>

