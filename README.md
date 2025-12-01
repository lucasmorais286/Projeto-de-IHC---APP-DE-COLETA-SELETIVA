# 📱 RECicla+ — App de Engajamento para Coleta Seletiva  

![Banner](https://img.shields.io/badge/Projeto-IHC-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-Educacional-green?style=for-the-badge)

RECicla+ é um MVP desenvolvido como parte do Projeto de IHC, com o objetivo de aumentar o engajamento dos moradores na coleta seletiva através de metas coletivas, educação ambiental e transparência no processo de reciclagem.

---

## 🌎 Visão Geral da Solução  

A aplicação possui **duas interfaces principais**:

---

### 👥 Interface do Morador  

- 📊 **Painel coletivo** com meta mensal  
- 🏆 **Feed de conquistas** atualizado automaticamente  
- ♻️ **Guia da coleta** com busca + pode/não pode  
- 🌱 **Tela de impacto** mostrando resultados acumulados  
- 📅 **Agenda** de coleta com avisos importantes  

---

### 🔧 Interface do Administrador/Zelador  

- 👥 **Gerenciamento de moradores e zeladores**  
- 🎯 **Definição e acompanhamento das metas coletivas**  
- 📣 **Envio de comunicados** para o feed dos moradores  
- 🗑️ **Registro de descarte** por categoria  
- 🚚 **Confirmação de coleta** após visita da cooperativa  

---

## 📁 Estrutura do Projeto  

/ (raiz do repositório)
├── app/ # Projeto frontend (Next.js)
│ ├── app/ # Rotas, páginas e layouts
│ ├── components/ # Componentes reutilizáveis
│ ├── hooks/ # Hooks customizados
│ ├── lib/ # Funções utilitárias
│ ├── public/ # Imagens e assets
│ ├── styles/ # Estilos globais e módulos CSS
│ ├── package.json
│ └── tsconfig.json
│
├── docs/ # Documentação, protótipos e relatórios
└── README.md

yaml
Copiar código

---

## 🚀 Como Rodar o Projeto  

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/lucasmorais286/Projeto-de-IHC---APP-DE-COLETA-SELETIVA.git
2️⃣ Instalar dependências
Entre na pasta app e instale:

bash
Copiar código
cd app
npm install     # ou pnpm install
3️⃣ Rodar o servidor de desenvolvimento
bash
Copiar código
npm run dev     # ou pnpm dev
Acesse:

👉 http://localhost:3000

🔧 Tecnologias Utilizadas
Next.js 16 (App Router)

React

TypeScript

Shadcn/UI

CSS Modules

Node.js

📌 Status do Projeto
✔ Estrutura do repositório configurada

✔ Frontend inicial funcionando

✔ Fluxo Git organizado (development → main)

🔜 Implementação das telas do MVP

🔜 Backend (opcional para segunda fase)

🔜 Testes e melhorias de usabilidade

📄 Licença
📘 Este projeto é de uso educacional no contexto da disciplina de Interação Humano-Computador (UFPE).

👨‍💻 Equipe
Projeto desenvolvido por estudantes da UFPE no contexto da disciplina de IHC.
Contribuições de colegas e orientadores são bem-vindas.
