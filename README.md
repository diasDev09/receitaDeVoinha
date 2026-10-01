# 🍲 Receita de Voinha

Aplicação web de receitas culinárias caseiras, desenvolvida em **React + JavaScript + Vite**. Apresenta as receitas de forma visual, organizada e interativa, com busca, filtros, favoritos e cadastro de novas receitas.

Projeto da **AV1** da disciplina [nome da disciplina] — [seu nome / nomes da dupla].

## ✨ Funcionalidades

- Página inicial com destaque, receitas mais bem avaliadas e categorias
- Listagem de receitas com **busca por texto** (nome, descrição e ingredientes), **filtro por categoria** e **ordenação**
- Página de **detalhes** com ingredientes e modo de preparo
- **Favoritar** receitas, com página de favoritos
- **Cadastro de nova receita** com formulário controlado e validação
- Mensagens de lista vazia, validação, sucesso e erro
- Layout responsivo
- Páginas Categorias, Sobre e 404

## 🛠️ Tecnologias

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- JavaScript, HTML e CSS

## ▶️ Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 20 ou superior.

```bash
# clonar o repositório
git clone https://github.com/[seu-usuario]/receita-de-voinha.git
cd receita-de-voinha

# instalar as dependências
npm install

# iniciar em modo de desenvolvimento
npm run dev
```

Abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

Outros comandos:

| Comando           | O que faz                           |
| ----------------- | ----------------------------------- |
| `npm run build`   | Gera a versão final na pasta `dist` |
| `npm run preview` | Executa localmente a versão gerada  |
| `npm run lint`    | Verifica o código com ESLint        |

## 🗺️ Rotas

| Rota            | Página                                |
| --------------- | ------------------------------------- |
| `/`             | Home                                  |
| `/receitas`     | Lista de receitas com busca e filtros |
| `/receitas/:id` | Detalhes da receita                   |
| `/nova-receita` | Formulário de cadastro                |
| `/favoritos`    | Receitas favoritadas                  |
| `/categorias`   | Categorias                            |
| `/sobre`        | Sobre o projeto                       |
| `*`             | Página não encontrada (404)           |

Os filtros da lista ficam na URL, por exemplo `/receitas?categoria=Massas&busca=queijo`.

## 🗂️ Estrutura do projeto

```
public/
└── images/            # fotos das receitas
src/
├── components/
│   ├── common/        # Button, Input, SearchBar, Loading, EmptyState, ErrorMessage
│   ├── layout/        # Header, Navbar, Footer, ScrollToTop
│   ├── home/          # Hero, FeaturedRecipes, CategoryPreview
│   ├── recipes/       # RecipeCard, RecipeGrid, RecipeFilter, RecipeForm, RecipeIngredients
│   └── categories/    # CategoryCard, CategoryGrid
├── data/              # recipes.js, categories.js
├── hooks/             # useFavorites, useDocumentTitle
├── layouts/           # MainLayout
├── pages/             # Home, Recipes, RecipeDetails, NewRecipe, Favorites, Categories, About, NotFound
├── styles/            # estilos globais e por área
├── utils/             # storage.js, validators.js, recipes.js, images.js
├── App.jsx
└── main.jsx
```

## 📦 Dados

Nesta versão não há API nem banco de dados. Os dados iniciais ficam em arquivos locais:

- `src/data/recipes.js`: receitas iniciais
- `src/data/categories.js`: categorias

Modelo de uma receita:

```js
{
  id: 1,
  title: "Feijoada Caseira",
  category: "Carnes",
  description: "Uma receita tradicional...",
  image: "/images/feijoada.png",
  rating: 4.9,
  time: "1h30",
  ingredients: ["Feijão", "Carne seca", "Linguiça"],
  preparation: ["Deixe o feijão de molho...", "Prepare as carnes..."]
}
```

## 💾 Persistência (localStorage)

Duas informações são salvas no navegador e permanecem após recarregar a página:

| Chave                | Conteúdo                                              |
| -------------------- | ----------------------------------------------------- |
| `rdv:favorites`      | Lista com os `id` das receitas favoritadas            |
| `rdv:custom-recipes` | Receitas cadastradas pelo usuário (objetos completos) |

A lista exibida é a união das receitas iniciais com as cadastradas (`getAllRecipes` em `src/utils/recipes.js`). Para limpar os dados salvos, apague essas chaves em _DevTools → Application → Local Storage_.

Como o armazenamento é local, os dados ficam apenas no navegador de quem os criou.

## ✅ Requisitos da AV1

- [x] React + JavaScript + Vite
- [x] React Router com 8 rotas
- [x] Página inicial com o propósito do produto
- [x] Dados locais em JS
- [x] Busca, filtro por categoria e ordenação
- [x] Formulário controlado com validação
- [x] Duas ações de alteração: favoritar e cadastrar receita
- [x] Persistência com localStorage
- [x] Mensagens de lista vazia, validação, sucesso e erro
- [x] Componentização (páginas, componentes, dados, utilitários e estilos)

## 🚀 Evolução prevista (AV2)

A arquitetura foi organizada para facilitar a próxima etapa: integração com API, camada de serviços, estados de carregamento/erro, autenticação e rotas protegidas.

## 👩‍🍳 Autoria

[Caio Dias de Miranda] — [https://github.com/diasDev09/]
