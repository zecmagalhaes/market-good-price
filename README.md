# Minimercado Bom Preço

## Descrição do projeto

Site institucional para o Minimercado Bom Preço, com foco na apresentação dos produtos, e serviços oferecidos pelo estabelecimento, como agendamento de entregas/retiradas, entre outros.

<img src="assets/project.gif" />

## Tecnologias utilizadas

- HTML5
- Bootstrap 5.3.8 (CDN)
- JavaScript

## Novas funcionalidades

- UI responsiva com Bootstrap 5.3.8
- Carrossel acessível com rótulos ARIA e legendas
- Formulário de cadastro & agendamento
- Campos de contato e endereços
- Preferência de recebimento (tele-entrega/retirada)
- Validações personalizadas (datas/horários, obrigatoriedade)
- Modal de confirmação antes de concluir
- Toast de sucesso após confirmar
- Google Maps incorporado na seção “Venha nos visitar!”.

## Estrutura do código

A página utiliza uma estrutura HTML semântica, com tags como `<header>`, `<main>`, `<section>`, `<footer>` e `<div>` para organizar o conteúdo de forma lógica. As imagens dos produtos são exibidas com a tag `<img>` e textos alternativos `(alt)` para acessibilidade.

## Como visualizar o projeto

Caso deseje visualizar o projeto localmente, abra um terminal e rode:

```sh
git clone git@github.com:zecmagalhaes/market-good-price.git
```

Abra o arquivo `index.html` em qualquer navegador web ou, inicie a aplicação utilizando o VSCode através da extensão `Live Server`, clicando em `Go Live` no rodapé da IDE.

## Funcionalidades da página

### 1. Estrutura organizada

A página web está organizada em seções que podem ser acessadas facilmente pelo menu de navegação.

### 2. Sistema de navegação

No topo da página, o menu de navegação permite que o usuário salte para as seções principais:

- Produtos: Exibe os produtos separados por categorias
- Serviços: Apresenta os serviços adicionais oferecidos
- Cadastro e Agendamento: Seção para inserir informações para agendamentos

### 3. Catálogo de produtos

A página exibe três categorias de produtos com três produtos cada, descrição e valores:

- Hortifruti (Banana nanica, Maçã gala e Limão taiti)
- Bebidas (Cola cola, Suco de laranja e Água com gás)
- Padaria (Pão francês, Pizza e Bolo de chocolate)

### 4. Seção de serviços

O minimercado oferece quatro serviços com valores definidos:

- Entrega em domicílio: Permite que o cliente receba suas compras em casa
- Recarga de celular: Oferece a comodidade de recarregar o celular no caixa
- Pagamento de contas: Possibilita o pagamento de contas de água, luz, etc
- Embalagem para presentes: Um serviço extra para quem deseja presentear com produtos da loja

### 5. Canais de contato

Além de informações legais de autoria, o rodapé inclui múltiplas formas de contato:

- E-mail: Um link direto para enviar um e-mail
- WhatsApp: Um botão para iniciar uma conversa diretamente pelo aplicativo de mensagens
- Perfil do desenvolvedor: Um link para o perfil do GitHub do criador da página
