# Mestres do Mistério (versão React)

Um explorador interativo para descobrir os autores e as características dos subgêneros da literatura de mistério e suspense, com apoio da IA generativa do Google.

Esta é a **versão em React** do projeto. A versão original, em HTML, CSS e JavaScript puros, está em [projeto-mestres-do-misterio](https://github.com/Alexmacol/projeto-mestres-do-misterio) e publicada em https://projeto-mestres-do-misterio.vercel.app/.

## Sobre o Projeto

"Mestres do Mistério" é uma aplicação web de página única para amantes da literatura de mistério. O usuário escolhe um subgênero e pode explorar o universo do mistério de duas formas: descobrindo os autores mais influentes do subgênero ou lendo uma análise aprofundada sobre ele.

Todo o conteúdo é gerado sob demanda por uma API em Node.js, que centraliza a comunicação com o modelo `gemini-2.5-flash` da Google Generative AI.

A migração para React foi feita passo a passo, com o objetivo de praticar JSX, props, `useState`, `useEffect`, hooks próprios, renderização condicional e listas com `key`, mantendo a aparência e o comportamento da versão original e acrescentando um menu no topo.

## Funcionalidades Principais

- **Seleção de subgêneros:** menu suspenso preenchido a partir do arquivo `src/data/data.json`.
- **Duas buscas:**
  - **Buscar Escritores:** cartões de autores com nome, datas, descrição e principais obras, com detalhes expansíveis.
  - **Buscar Subgênero:** cartão com uma análise sobre origens, características e obras do subgênero, com títulos e termos estrangeiros em itálico.
- **Menu no topo:** links para o início, a busca e o contato, fixo ao rolar a página, com rolagem suave (desligada para quem pede menos movimento no sistema).
- **Estados da busca:** spinner no botão da busca ativa, controles desabilitados durante a busca, mensagem de erro e cancelamento automático da busca anterior.
- **Design responsivo:** o layout se adapta a diferentes tamanhos de tela.

## Tecnologias e Métodos

**Front-end:**
- **React 19** com **Vite 8**, em JavaScript (sem TypeScript).
- **Hook próprio `useSearch`:** concentra a chamada à API, os estados de carregamento, erro e resultado, e o cancelamento real com `AbortController` guardado em um `useRef`.
- **CSS puro**, com Google Fonts (Special Elite) e Font Awesome.
- **ESLint 10**, com configuração própria para a pasta `api/` (ambiente Node).

**Back-end:**
- **Node.js 22.x** com **Express 5**, em ES Modules.
- **Google Generative AI SDK (`@google/generative-ai`):** cliente do Gemini.
- **`express-rate-limit`**: limite de requisições por IP.
- **`dotenv`:** variáveis de ambiente, como a chave da API.

### Segurança no front-end

O texto que vem da IA nunca é inserido como HTML. O React escapa tudo o que é exibido entre chaves, e o itálico (`<i>...</i>` ou trechos entre crases) é montado criando elementos `<i>` do próprio React. Por isso o projeto não usa `dangerouslySetInnerHTML`, e qualquer outro HTML que a IA devolva aparece como texto, sem virar código.

### Acessibilidade

- Região `role="status"` (escondida visualmente) que avisa leitores de tela quando a busca começa e termina.
- Mensagem de erro com `role="alert"`.
- Botão "Saiba mais" com `aria-expanded` e `aria-controls`.
- Menu em um `<nav>` com `aria-label`, com destaque também no foco do teclado.
- Rótulo do campo de seleção escondido visualmente, mas disponível para leitores de tela.

### Arquitetura da API

A API tem um único endpoint, `POST /api/search`, que recebe `subgenre` e `searchType` (`'escritores'` ou `'subgenero'`).

**Proteções da API:**
- **Validação do subgênero:** o servidor só aceita os `id` listados em `src/data/data.json`, a mesma lista que preenche o menu. Qualquer outro valor é recusado com erro 400, o que impede que um texto qualquer chegue ao prompt enviado ao Gemini.
- **Limite de requisições:** no máximo 10 buscas por minuto por IP, para proteger a chave da API e a cota do Gemini.
- **Validação do formato da resposta:** o servidor confere se a resposta da IA tem a estrutura esperada antes de enviá-la ao front-end.

**Resiliência:** quando o Gemini falha, está sobrecarregado ou devolve uma resposta inválida, o servidor faz até 3 tentativas, com espera crescente entre elas (2 s e 4 s). As duas primeiras usam o modelo principal (`gemini-2.5-flash`) e a terceira usa o modelo de reserva (`gemini-3.5-flash-lite`).

Como o site e a API ficam no mesmo endereço (o proxy do Vite em desenvolvimento e o mesmo domínio na Vercel), o navegador nunca faz requisições entre origens diferentes, e o projeto não precisa de CORS.

## Estrutura do Projeto

```
api/
  server.js            Servidor Express (função da Vercel)
public/
  favicon.svg
src/
  components/          AuthorCard, DescriptionCard, ErrorMessage, Footer,
                       Hero, Navbar, ResultsSection, SearchControls,
                       StatusMessage
  css/                 style.css, responsive.css, scrollbar.css, navbar.css
  data/data.json       Lista de subgêneros (menu e whitelist do servidor)
  hooks/useSearch.js   Hook da busca
  image/               Imagem do Hero
  utils/               formatAuthorDates.js
  App.jsx
  main.jsx
vercel.json            Rewrite de /api/* para o servidor
```

## Como Executar

**Pré-requisitos:**
- **Node.js 22.x** instalado (inclui o `npm`).
- Uma **chave de API do Google Gemini**, que você pode obter no [Google AI Studio](https://aistudio.google.com/).

**Instalação e execução:**

1. **Clone o repositório** e entre na pasta do projeto.

2. **Crie o arquivo de ambiente.** Na raiz do projeto, crie um arquivo chamado `.env` com a sua chave (ele não é enviado ao GitHub):
   ```
   GEMINI_API_KEY=SUA_CHAVE_DE_API_AQUI
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie a API**, em um terminal:
   ```bash
   npm run server
   ```
   O servidor roda em `http://localhost:3000`. Sem a chave no `.env`, ele se recusa a iniciar.

5. **Inicie o front-end**, em outro terminal:
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:5173`. O Vite repassa as chamadas de `/api` para o servidor da etapa anterior.

**Outros comandos:**
- `npm run build`: gera a versão de produção na pasta `dist`.
- `npm run preview`: serve a versão de produção localmente.
- `npm run lint`: roda o ESLint.

## Deploy

O projeto é preparado para a Vercel:

- O front-end (Vite) é detectado automaticamente. A Vercel roda `npm run build` e publica a pasta `dist`.
- O `api/server.js` vira uma função, e o `vercel.json` leva tudo que começa com `/api/` até ela.
- O campo `engines` do `package.json` fixa o Node em 22.x.
- A chave do Gemini fica na variável de ambiente `GEMINI_API_KEY`, configurada no painel do projeto na Vercel.
