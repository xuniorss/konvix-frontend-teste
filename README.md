# Teste Konvix Frontend (React.js)

Projeto desenvolvido usando Vite.js, com o intuito de atender as funcionalidades de teste teste (login, cadastro de clientes, vendas e relatórios.).

### 📋 Pré-requisitos

A versão do `Node.js` deve estar na `18.17.0 ou superior`.

## 🚀 Começando

Para executar esta aplicação em seu ambiente local, siga os passos abaixo:

### 🔧 Instalação

#### 1. Clone o repositório:

```shell
git clone https://github.com/xuniorss/konvix-frontend-teste.git
```

#### 2. Navegue até o diretório do projeto:

```shell
cd konvix-frontend-teste
```

#### 3. Instale as dependências:

```shell
npm i
# ou
yarn
```

## ⚙️ Configuração para início da aplicação

1. No arquivo `.env` informe:

```js
VITE_COOKIES = '@konvix-teste-cookie'
VITE_BASE_URL = 'http://0.0.0.0:3333'
VITE_UF_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
VITE_SALES = 'konvix-sale'
VITE_ALL_CUSTOMERS = 'konvix-all-customers'
VITE_REPORT_SALES_CUSTOMERS = 'konvix-report-sales-customers'
VITE_REPORT_SALES_FILTER = 'konvix-report-sales-filter'
VITE_LIST_ITEM_SALES = 'konvix-list-item-sales'
```

### 🏃‍♂️ Iniciando o projeto (em desenvolvimento)

```shell
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 🏃‍♂️ Iniciando o projeto (em produção)

1. Seguindo a documentação do [Vite.js](https://vitejs.dev/guide/static-deploy.html#building-the-app) sobre a construindo o aplicativo, pode ser testado localmente.

2. Na raiz do diretório `konvix-frontend-teste` execute os comandos no `terminal:`

```bash
yarn build
# ou
npm run build
```

em seguida

```bash
yarn preview
# ou
npm run preview
```

## 🛠️ Algumas libs utilizadas

-  [typescript](https://www.typescriptlang.org/)
-  [axios](https://axios-http.com/ptbr/docs/intro)
-  [js-cookie](https://www.npmjs.com/package/js-cookie)
-  [zod](https://zod.dev/)
-  [zustand](https://zustand-demo.pmnd.rs/)
-  [react-hook-form](https://react-hook-form.com/)
-  [tailwindcss](https://tailwindcss.com/)
-  [react-query](https://tanstack.com/query/v3/docs/react/overview)
-  [react-table](https://tanstack.com/table/v8)
-  [date-fns](https://date-fns.org/)
-  [shadcn/ui](https://ui.shadcn.com/docs)

---

por [Gilberto Fortunato](https://github.com/xuniorss)
