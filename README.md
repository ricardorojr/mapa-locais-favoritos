### Mapa de Locais Favoritos

Uma aplicação interativa e gerenciamento de pontos de interesse, desenvolvida com o ecossistema moderno do **React 19** e **Vite**.

## Configuração de Ambiente e Instalação 
Siga os passos abaixo para rodar o projeto localmente (**Requer Node.js 22+**):
1. gitclone https://github.com/ricardorojr/mapa-locais-favoritos.git
2. Crie um arquivo `.env` na raiz do projeto e inclua VITE_API_URL="https://nominatim.openstreetmap.org"
3. npm install
4. npm run dev

## 🚀 Tecnologias Principais

- **Core:** [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- **Build Tool:** [Vite](https://pt.vite.dev)
- **Mapas:** [Leaflet](https://leafletjs.com) & [React-Leaflet](https://react-leaflet.js.org)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + [Headless UI](https://headlessui.com)
- **Utilitários:** `clsx` e `tailwind-merge` para gestão dinâmica de classes CSS.


 🔌 Documentação da API
A aplicação utiliza a API pública do Nominatim (OpenStreetMap) para serviços de geocodificação via TanStack Query.
Principais Endpoints Consumidos

| Método | Endpoint | Função | Parâmetros Obrigatórios |
| :--- | :--- | :--- | :--- |
| `GET` | `/search` | Busca coordenadas por texto | `q={endereco}`, `format=json` |
| `GET` | `/reverse` | Endereço por coordenadas | `lat={lat}`, `lon={lon}`, `format=json` |

## Mapas e Geolocalização
Leaflet: Biblioteca open-source para mapas interativos.
React-Leaflet 5: Componentes React para integração com Leaflet.

## Gerenciamento de Dados
TanStack Query v5: Gerenciamento de estado assíncrono e cache de requisições (React Query).

## Interface e Estilização
Tailwind CSS 4: Framework CSS utilitário para estilização rápida.
Headless UI: Componentes de interface totalmente acessíveis e sem estilos pré-definidos.
Clsx & Tailwind Merge: Utilitários para manipulação e merge inteligente de classes CSS.

## 🛠️ Scripts Disponíveis
Comandos:
npm run dev: Inicia o servidor local com Hot Module Replacement (HMR).
npm run build: Executa tsc para checagem de tipos e gera o build de produção via Vite.
npm run lint: Analisa o código em busca de erros e padrões com ESLint.
npm run preview: Inicia um servidor local para visualizar o projeto compilado para produção.

