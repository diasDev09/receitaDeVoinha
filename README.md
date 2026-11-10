# 🍲 Receita de Voinha

Aplicação web de receitas culinárias caseiras, desenvolvida em **React + JavaScript + Vite**. Apresenta as receitas de forma visual, organizada e interativa, com busca, filtros, favoritos e cadastro de novas receitas. Na AV2, as receitas e categorias passam a vir de uma **API REST em Java + Spring Boot**.

Projeto da disciplina Front-end Frameworks (AV1 e AV2) — Caio Dias de Miranda.

- Repositório do front-end (este): <https://github.com/diasDev09/receitaDeVoinha>
- Repositório da API: <https://github.com/diasDev09/receitaDeVoinha-api>

## 🎯 Problema e público

Receitas de família costumam ficar em cadernos, mensagens e na memória de quem cozinha, e são difíceis de achar na hora do preparo. O Receita de Voinha reúne receitas caseiras em um só lugar, com busca por nome ou ingrediente e favoritos. O público é quem cozinha em casa e quer consultar rapidamente uma receita simples, ou guardar as da família.

## 👥 Integrantes e contribuição

| Integrante | Contribuição |
| --- | --- |
| Caio Dias de Miranda | Projeto individual (exceção autorizada pelo professor): front-end, API, banco de dados, testes e documentação. Cumpre os mesmos requisitos mínimos de uma equipe de 3 pessoas. |

## ✨ Funcionalidades

- Página inicial com destaque, receitas mais bem avaliadas e categorias
- Listagem de receitas com **busca por texto** (nome, descrição e ingredientes), **filtro por categoria** e **ordenação**
- Página de **detalhes** com ingredientes e modo de preparo
- **Favoritar** receitas, com página de favoritos
- **Cadastro de nova receita** com formulário controlado e validação
- Estados de **carregamento**, **erro com "Tentar novamente"**, **lista vazia** e **receita não encontrada (404)**
- Layout responsivo
- Páginas Categorias, Sobre e 404

## 🛠️ Tecnologias

- [React](https://react.dev/) 19, [Vite](https://vite.dev/) e [React Router](https://reactrouter.com/)
- JavaScript, HTML e CSS tradicional (sem biblioteca de UI)
- `fetch` para consumir a API, centralizado em `src/services/`
- [oxlint](https://oxc.rs/docs/guide/usage/linter) para análise do código
- Back-end (repositório à parte): Java 21, Spring Boot, Spring Data JPA e banco H2

## ▶️ Como executar

Pré-requisitos: [Node.js](https://nodejs.org/) 20 ou superior e a [API](https://github.com/diasDev09/receitaDeVoinha-api) rodando em `http://localhost:8080` (instruções no README dela).

```bash
# clonar o repositório
git clone https://github.com/diasDev09/receitaDeVoinha.git
cd receitaDeVoinha

# configurar a URL da API (Windows: copy .env.example .env)
cp .env.example .env

# instalar as dependências
npm install

# iniciar em modo de desenvolvimento
npm run dev
```

Abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

Variável de ambiente (arquivo `.env`, que **não** é versionado; o modelo é o `.env.example`):

| Variável | Padrão | Para que serve |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:8080` | Endereço da API |

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run build` | Gera a versão final na pasta `dist` |
| `npm run preview` | Executa localmente a versão gerada |
| `npm run lint` | Verifica o código com oxlint |

## 🗺️ Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/receitas` | Lista de receitas com busca e filtros |
| `/receitas/:id` | Detalhes da receita |
| `/nova-receita` | Formulário de cadastro |
| `/favoritos` | Receitas favoritadas |
| `/categorias` | Categorias |
| `/sobre` | Sobre o projeto |
| `*` | Página não encontrada (404) |

Os filtros da lista ficam na URL, por exemplo `/receitas?categoria=Massas&busca=queijo`.

## 🗂️ Estrutura do projeto

```
public/
└── images/            # fotos das receitas
src/
├── components/
│   ├── common/        # Button, Input, SearchBar, Loading, EmptyState, ErrorState, ErrorMessage
│   ├── layout/        # Header, Navbar, Footer, ScrollToTop
│   ├── home/          # Hero, FeaturedRecipes, CategoryPreview
│   ├── recipes/       # RecipeCard, RecipeGrid, RecipeFilter, RecipeForm, RecipeIngredients
│   └── categories/    # CategoryCard, CategoryGrid
├── data/              # recipes.js, categories.js (dados iniciais da AV1)
├── hooks/             # useAsync, useFavorites, useDocumentTitle
├── layouts/           # MainLayout
├── pages/             # Home, Recipes, RecipeDetails, NewRecipe, Favorites, Categories, About, NotFound
├── services/          # api.js (fetch + erros), recipeService.js, categoryService.js
├── styles/            # estilos globais, por área e theme.css (tema visual da AV2)
├── utils/             # storage.js, validators.js, recipes.js, images.js
├── App.jsx
└── main.jsx
```

## 📦 Dados e persistência

| Dado | Onde fica |
| --- | --- |
| Receitas e categorias iniciais | API (banco H2 em memória, carregado de `data.sql` a cada início) |
| Favoritos | `localStorage`, chave `rdv:favorites` (lista de `id`) |
| Receitas cadastradas pelo usuário | `localStorage`, chave `rdv:custom-recipes` (objetos completos) |

A lista exibida é a união das receitas da API com as cadastradas no navegador (`listRecipes` em `src/services/recipeService.js`). Para limpar os dados locais, apague essas chaves em _DevTools → Application → Local Storage_.

Como o banco H2 é em memória, os dados da API voltam ao estado inicial sempre que ela reinicia. Os dados do `localStorage` ficam apenas no navegador de quem os criou.

## 🔌 Contrato da API

Base: `VITE_API_URL` (padrão `http://localhost:8080`). Detalhes completos no README da API.

| Método e caminho | Resposta |
| --- | --- |
| `GET /api/receitas?busca=&categoria=` | 200 com a lista de receitas |
| `GET /api/receitas/{id}` | 200 com a receita; 404 se não existe; 400 se o `id` não é número |
| `GET /api/categorias` | 200 com a lista de categorias |

Receita (mesmos campos da AV1, para o front não precisar ser reescrito):

```json
{
  "id": 1,
  "title": "Feijoada Caseira",
  "category": "Carnes",
  "description": "Uma receita tradicional...",
  "image": "/images/feijoada.png",
  "rating": 4.9,
  "time": "1h30",
  "ingredients": ["500 g de feijão preto", "..."],
  "preparation": ["Deixe o feijão de molho...", "..."]
}
```

Formato de erro (todas as falhas da API):

```json
{ "status": 404, "message": "Receita 99 não encontrada.", "fields": {} }
```

As imagens ficam em `public/images` deste repositório; a API devolve apenas o caminho.

## 🔄 Evolução AV1 → AV2

| Aspecto | AV1 | AV2 |
| --- | --- | --- |
| Receitas e categorias | Arquivos locais `src/data/*.js` | API REST Java + Spring Boot (H2) |
| Acesso aos dados | `getAllRecipes()` síncrono | Camada `src/services/` com `fetch` assíncrono |
| Estados de tela | Lista vazia, validação, sucesso | Carregando, erro com nova tentativa, vazio e 404 |
| Configuração | Nenhuma | `VITE_API_URL` em `.env` (modelo em `.env.example`) |
| Visual | Tema verde | Tema novo (creme, amarelo e verde-limão) em `theme.css` |

Etapas da AV2 ainda **não concluídas**: login com JWT, cadastro de receita e favoritos gravados na API, rotas protegidas e logout.

## ✅ Requisitos

AV1:

- [x] React + JavaScript + Vite
- [x] React Router com 8 rotas
- [x] Página inicial com o propósito do produto
- [x] Dados locais em JS
- [x] Busca, filtro por categoria e ordenação
- [x] Formulário controlado com validação
- [x] Duas ações de alteração: favoritar e cadastrar receita
- [x] Persistência com localStorage
- [x] Mensagens de lista vazia, validação, sucesso e erro
- [x] Componentização

AV2:

- [x] API própria em Java + Spring Boot (repositório à parte)
- [x] Camada de serviços e `VITE_API_URL`
- [x] Estados de carregamento, erro e vazio
- [ ] Autenticação (login com JWT), rotas protegidas e logout
- [ ] Cadastro de receita e favoritos gravados na API
- [ ] Dados de contingência para a apresentação

## ⚠️ Limitações e contingência

- A API usa banco H2 em memória: ao reiniciar, os dados voltam ao estado inicial.
- Receitas cadastradas e favoritos ainda ficam só no navegador (`localStorage`).
- O filtro de categorias e o formulário de cadastro ainda leem `src/data/categories.js`, e não a API.
- Se a API estiver fora do ar, as páginas mostram a mensagem de erro e o botão "Tentar novamente".
- Contingência para a apresentação: os dados iniciais continuam em `src/data/recipes.js` e `src/data/categories.js`. Um modo de apresentação que use esses arquivos quando a API não responder ainda não está implementado.
- Sem segredos no repositório: `.env` está no `.gitignore` e só o `.env.example` é versionado.

## 🤖 Uso de IA

Foi usado o assistente Claude (Anthropic) como apoio. Ele ajudou a:

- planejar o roteiro da AV2 e analisar o repositório da AV1;
- gerar a base da API Spring Boot (entidades, repositórios, serviços, controladores e `data.sql`);
- escrever a camada `src/services/`, o hook `useAsync` e os estados de tela;
- propor o tema visual (`theme.css`), a partir da análise de um template usado só como referência de layout, sem copiar o código dele;
- redigir este README.

O autor executou, testou e revisou o resultado, e é responsável por todo o conteúdo entregue.

## 👨‍🍳 Autoria

Caio Dias de Miranda — <https://github.com/diasDev09/>