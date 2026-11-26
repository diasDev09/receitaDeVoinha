# 🍲 Receita de Voinha

Aplicação web de receitas culinárias caseiras, desenvolvida em **React + JavaScript + Vite**. Apresenta as receitas de forma visual, organizada e interativa, com busca, filtros, favoritos e cadastro de novas receitas. Na AV2, receitas, categorias, favoritos e cadastro passam a usar uma **API REST em Java + Spring Boot**, com **login, sessão, rotas protegidas e logout**.

Projeto da disciplina Front-end Frameworks (AV1 e AV2), Opção B (API do projeto de Back-end) — Caio Dias de Miranda.

- Repositório do front-end (este): <https://github.com/diasDev09/receitaDeVoinha>
- Repositório da API: <https://github.com/diasDev09/receitaDeVoinha-api>

## 🎯 Problema e público

Receitas de família costumam ficar em cadernos, mensagens e na memória de quem cozinha, e são difíceis de achar na hora do preparo. O Receita de Voinha reúne receitas caseiras em um só lugar, com busca por nome ou ingrediente e favoritos. O público é quem cozinha em casa e quer consultar rapidamente uma receita simples, ou guardar as da família.

## 👥 Integrantes e contribuição

| Integrante | Contribuição |
| --- | --- |
| Caio Dias de Miranda | Projeto individual (exceção autorizada pelo professor): front-end, API, banco de dados, autenticação, testes e documentação. Cumpre os mesmos requisitos mínimos de uma equipe de 3 pessoas. |

## ✨ Funcionalidades

- Página inicial com destaque, receitas mais bem avaliadas e categorias
- Listagem de receitas com **busca por texto** (nome, descrição e ingredientes), **filtro por categoria** e **ordenação**
- Página de **detalhes** com ingredientes, modo de preparo e autor
- **Login** com validação de campos e feedback de envio, credenciais inválidas e falha de rede
- **Sessão preservada** após atualizar a página (token no `localStorage`, nunca a senha) e **logout**
- **Rotas protegidas** (`/nova-receita` e `/favoritos`): sem sessão, redirecionam para `/login` e depois voltam para onde o usuário queria ir
- **Favoritar** receitas, com página de favoritos por usuário (gravados na API)
- **Cadastro de nova receita** gravado na API, com validação no formulário e no servidor (erros por campo)
- **Excluir receita** (só o autor; a API responde 403 para os demais)
- Estados de **carregamento**, **erro com "Tentar novamente"**, **lista vazia** e **receita não encontrada (404)**
- **Modo contingência**: se a API estiver fora do ar, o usuário pode ver os dados de demonstração locais
- Layout responsivo; páginas Categorias, Sobre e 404

## 🛠️ Tecnologias

- [React](https://react.dev/) 19, [Vite](https://vite.dev/) e [React Router](https://reactrouter.com/)
- JavaScript, HTML e CSS tradicional (sem biblioteca de UI); ícones [Lucide](https://lucide.dev/) (`lucide-react`)
- Fontes Old Standard TT (texto) e Instrument Sans (interface), do Google Fonts
- `fetch` para consumir a API, centralizado em `src/services/`
- Context API (`AuthProvider`) para a sessão
- [oxlint](https://oxc.rs/docs/guide/usage/linter) para análise do código
- Back-end (repositório à parte): Java 25, Spring Boot, Spring Data JPA, BCrypt, Flyway e PostgreSQL no Supabase (H2 em memória como padrão local)

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

**Contas de demonstração** (também aparecem na tela de login):

| Usuário | Senha | Observação |
| --- | --- | --- |
| `voinha` | `voinha123` | Autora das 9 receitas iniciais (pode excluí-las) |
| `neto` | `neto123` | Usuário comum (recebe 403 ao tentar excluir receita da Voinha) |

Variável de ambiente (arquivo `.env`, que **não** é versionado; o modelo é o `.env.example`):

| Variável | Padrão | Para que serve |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:8080` | Endereço da API (usado só em `src/services/api.js`) |

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run build` | Gera a versão final na pasta `dist` |
| `npm run preview` | Executa localmente a versão gerada |
| `npm run lint` | Verifica o código com oxlint |

## 🗺️ Rotas

| Rota | Página | Acesso |
| --- | --- | --- |
| `/` | Home | Público |
| `/receitas` | Lista de receitas com busca e filtros | Público |
| `/receitas/:id` | Detalhes da receita (favoritar e excluir) | Público (ações exigem login) |
| `/categorias` | Categorias | Público |
| `/sobre` | Sobre o projeto | Público |
| `/login` | Login | Público |
| `/nova-receita` | Formulário de cadastro | **Protegida** |
| `/favoritos` | Receitas favoritadas do usuário | **Protegida** |
| `*` | Página não encontrada (404) | Público |

Os filtros da lista ficam na URL, por exemplo `/receitas?categoria=Massas&busca=queijo`. A proteção vale também para o endereço digitado direto na barra do navegador (`ProtectedRoute` em `src/components/auth/`).

## 🗂️ Estrutura do projeto

```
public/
└── images/            # fotos das receitas
src/
├── components/
│   ├── auth/          # ProtectedRoute
│   ├── common/        # Button, Input, SearchBar, Loading, EmptyState, ErrorState, ErrorMessage
│   ├── layout/        # Header (Entrar/Sair), Navbar, Footer, ScrollToTop, ContingencyBanner
│   ├── home/          # Hero, FeaturedRecipes, CategoryPreview
│   ├── recipes/       # RecipeCard, RecipeGrid, RecipeFilter, RecipeForm, RecipeIngredients
│   └── categories/    # CategoryCard, CategoryGrid
├── contexts/          # authContext + AuthProvider (dono da sessão)
├── data/              # recipes.js, categories.js (dados da AV1, hoje usados na contingência)
├── hooks/             # useAsync, useAuth, useFavorites, useContingency, useDocumentTitle
├── layouts/           # MainLayout
├── pages/             # Home, Recipes, RecipeDetails, NewRecipe, Favorites, Categories, About, Login, NotFound
├── services/          # api.js (fetch, token, erros), authService, recipeService,
│                      # categoryService, favoriteService, contingency
├── styles/            # base (tokens, botões, formulários), layout, home, recipes, details, pages
├── utils/             # storage.js, validators.js, recipes.js, images.js
├── App.jsx
└── main.jsx
```

## 🔐 Como funciona a autenticação

1. `/login` envia `POST /api/auth/login` (`services/authService.js`). Enquanto envia, o botão mostra "Entrando..."; 401 mostra "Usuário ou senha inválidos." e limpa a senha; falha de rede mostra a mensagem de servidor fora do ar.
2. Sucesso: o `AuthProvider` (`src/contexts/AuthProvider.jsx`) guarda `{ token, user }` no `localStorage` (chave `rdv:session`) e entrega o token a `services/api.js`, que passa a mandar `Authorization: Bearer <token>`.
3. Ao recarregar a página, a sessão é lida do `localStorage` e confirmada com `GET /api/auth/me`.
4. Qualquer resposta **401** a uma requisição com token (sessão vencida ou API reiniciada) limpa a sessão; a rota protegida leva ao `/login` com o aviso "Sua sessão expirou".
5. **403** (ex.: excluir receita de outra pessoa) mostra a mensagem da API na própria tela, sem derrubar a sessão.
6. "Sair" chama `POST /api/auth/logout` (o token deixa de valer no servidor) e remove a sessão local. Numa rota protegida, o usuário vai para `/login` com o aviso "Você saiu da sua conta."

A senha nunca é salva no navegador nem no repositório; a API guarda só o hash BCrypt.

## 📦 Dados e persistência

| Dado | Onde fica |
| --- | --- |
| Receitas e categorias | API: PostgreSQL no Supabase (persistente). Sem configuração, H2 em memória |
| Receitas cadastradas | API (`POST /api/receitas`), com o usuário logado como autor |
| Favoritos | API, por usuário (`/api/favoritos`) |
| Sessão (token + nome do usuário) | `localStorage`, chave `rdv:session` |
| Modo contingência ligado | `sessionStorage`, chave `rdv:contingencia` (some ao fechar a aba) |
| Dados de contingência | `src/data/recipes.js` e `src/data/categories.js` (mesmo formato da API) |

Na AV1 favoritos e receitas novas ficavam no `localStorage` (`rdv:favorites` e `rdv:custom-recipes`). Na AV2 eles foram para a API e essas chaves não são mais lidas.

Com o Supabase configurado na API (`.env` dela), receitas cadastradas e favoritos continuam salvos depois de reiniciar o servidor. Sem ele, a API usa H2 em memória e os dados voltam ao estado inicial. Em ambos os casos as sessões ficam na memória da API e caem ao reiniciá-la (o front trata como sessão expirada).

## 🔌 Contrato da API

Base: `VITE_API_URL` (padrão `http://localhost:8080`). Detalhes, exemplos de corpo e de resposta no README da API.

| Método e caminho | Acesso | Resposta |
| --- | --- | --- |
| `POST /api/auth/login` | Público | 200 `{ token, user }`; 401 usuário/senha errados; 400 campo vazio |
| `GET /api/auth/me` | Token | 200 `{ id, name, username }`; 401 sem sessão válida |
| `POST /api/auth/logout` | Token | 204 |
| `GET /api/receitas?busca=&categoria=` | Público | 200 com a lista |
| `GET /api/receitas/{id}` | Público | 200; 404 se não existe; 400 se o `id` não é número |
| `POST /api/receitas` | Token | 201 com a receita; 400 com erros por campo; 401 |
| `DELETE /api/receitas/{id}` | Token (autor) | 204; 403 se não for o autor; 404; 401 |
| `GET /api/categorias` | Público | 200 com a lista |
| `GET /api/favoritos` | Token | 200 com as receitas favoritas do usuário |
| `PUT /api/favoritos/{id}` | Token | 204 (favoritar de novo não é erro); 404 |
| `DELETE /api/favoritos/{id}` | Token | 204 |

Receita (mesmos campos da AV1; `authorId` e `author` entraram na AV2):

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
  "preparation": ["Deixe o feijão de molho...", "..."],
  "authorId": 1,
  "author": "Dona Voinha"
}
```

Formato de erro (todas as falhas da API). `fields` traz os erros de validação com o mesmo nome dos campos do formulário, que o front marca direto no campo:

```json
{ "status": 400, "message": "Verifique os campos destacados.", "fields": { "title": "O nome deve ter entre 3 e 100 caracteres." } }
```

As imagens ficam em `public/images` deste repositório; a API devolve apenas o caminho.

## 🔄 Evolução AV1 → AV2

| Aspecto | Situação na AV1 | Evolução na AV2 | Evidência |
| --- | --- | --- | --- |
| Dados | Arquivos locais `src/data/*.js` | API REST Java + Spring Boot com PostgreSQL no Supabase | `src/services/*Service.js`, repositório da API |
| Acesso aos dados | `getAllRecipes()` síncrono | `fetch` assíncrono centralizado em `services/api.js` | `src/services/` |
| Cadastro e favoritos | `localStorage` do navegador | Gravados na API, por usuário | `recipeService.createRecipe`, `favoriteService` |
| Autenticação | Não implementada | Login, sessão restaurada no F5, rotas protegidas, logout, 401/403 | `pages/Login.jsx`, `contexts/AuthProvider.jsx`, `components/auth/ProtectedRoute.jsx` |
| Estados da interface | Lista vazia, validação, sucesso | Carregando, erro com nova tentativa, vazio, 404, erro de servidor por campo | `hooks/useAsync.js`, `components/common/ErrorState.jsx` |
| Falha da API | — | Modo contingência com dados locais e aviso fixo | `services/contingency.js`, `ContingencyBanner.jsx` |
| Configuração | Nenhuma | `VITE_API_URL` em `.env` (modelo em `.env.example`) | `src/services/api.js` |
| Organização | Páginas, componentes e dados | + `services/`, `contexts/`, `hooks/` de sessão e contingência | pastas |
| Visual | Tema verde | Caderno de receitas: capa azul-noite com estampa dourada, receita aberta como livro, sumário de capítulos, ícones no lugar de emojis | `src/styles/`, `CategoryIcon.jsx` |

## ✅ Requisitos

AV1:

- [x] React + JavaScript + Vite
- [x] React Router com mais de 3 rotas úteis (detalhe e cadastro inclusos)
- [x] Página inicial com o propósito do produto
- [x] Dados locais em JS
- [x] Busca, filtro por categoria e ordenação
- [x] Formulário controlado com validação
- [x] Duas ações de alteração: favoritar e cadastrar receita
- [x] Persistência com localStorage
- [x] Mensagens de lista vazia, validação, sucesso e erro
- [x] Componentização

AV2 (Opção B):

- [x] Tema, repositório e funcionalidades da AV1 preservados
- [x] Dados da API própria em Java + Spring Boot (repositório à parte)
- [x] `fetch` concentrado em `src/services/` e URL-base em `VITE_API_URL` (`.env.example` incluído)
- [x] Estados de carregamento, sucesso, vazio e erro, com "Tentar novamente"
- [x] Login com validação e feedback (envio, credenciais inválidas, falha de rede)
- [x] Rotas protegidas (`/nova-receita`, `/favoritos`), inclusive por URL digitada
- [x] Sessão preservada após atualizar a página, sem guardar senha
- [x] Logout que invalida o token na API e limpa a sessão local
- [x] Tratamento de 401 (sessão expirada) e 403 (excluir receita de outra pessoa)
- [x] Back-end com autenticação, leitura, criação e alteração de estado, protegendo os endpoints
- [x] Dados de contingência compatíveis com a interface

## ⚠️ Limitações e contingência

- Sem o `.env` do Supabase, a API usa H2 em memória e, ao reiniciar, receitas cadastradas e favoritos voltam ao estado inicial. Com o Supabase eles persistem; só as sessões caem ao reiniciar a API.
- Sessões ficam na memória da API e valem 8 horas; não há "lembrar de mim" nem renovação de token.
- Não há cadastro de novos usuários: só as contas de demonstração.
- Não há edição de receita; a alteração de estado é feita por cadastro, exclusão e favoritos.
- **Contingência:** se a API não responder, as páginas mostram "Servidor fora do ar" com **Tentar novamente** e **Ver dados de demonstração**. O segundo botão liga o modo contingência: as leituras passam a usar `src/data/` e uma faixa amarela avisa o usuário, com o botão "Voltar a usar a API". Login, cadastro, exclusão e favoritos não são simulados nesse modo; mostram uma mensagem clara.
- Sem segredos no repositório: `.env` está no `.gitignore`, só o `.env.example` é versionado, e as senhas de demonstração existem na API apenas como hash BCrypt.

## 👨‍🍳 Autoria

Caio Dias de Miranda — <https://github.com/diasDev09/>
