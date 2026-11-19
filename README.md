# Projeto React 02 — Aula 09

**Disciplina:** Frameworks Front-end — SENAI  
**Repositório:** [atividade-projeto-react-02](https://github.com/jenifferCamar/atividade-projeto-react-02)  
**Deploy (Vercel):** https://atividade-projeto-react-02.vercel.app

Aplicação React (Vite) desenvolvida para a Aula 09 (Projeto React 02), dando continuidade ao Projeto React 01. Implementa um **gerenciador de tarefas** com estado, eventos, formulário controlado, efeitos e persistência local.

## Funcionalidades
- Cadastrar tarefas com título e categoria (formulário controlado).
- Listar tarefas com renderização via `map()` e `key` estável.
- Marcar/desmarcar tarefa como concluída.
- Remover tarefas e limpar concluídas.
- Filtrar por status (todas, ativas, concluídas) e buscar por título/categoria.
- Contadores (total, ativas, concluídas).
- Persistência no `localStorage` (carregamento e salvamento com `useEffect`).
- Estados de UI: carregamento, lista vazia, sem resultados para filtro/busca e mensagens de erro.
- Layout responsivo.

## Conceitos aplicados
- **Componentes funcionais e JSX:** `App` e estrutura declarativa.
- **`useState`:** tarefas, campos do formulário, filtro, busca, loading e erro.
- **Eventos:** `onSubmit`, `onChange`, `onClick`.
- **Formulário controlado:** inputs/select vinculados ao estado.
- **`useEffect`:** carregar tarefas do `localStorage` na montagem e persistir alterações.
- **Listas e keys:** `tarefasFiltradas.map(...)` com `key={tarefa.id}`.
- **Renderização condicional:** carregando, vazio, sem resultados e alertas.

## Tecnologias
- React 19, Vite 5, JavaScript (ESM), CSS

## Como executar
```bash
npm install
npm run dev
```

## Build e preview
```bash
npm run build
npm run preview
```

## Estrutura
```text
.
├─ index.html
├─ vite.config.js
├─ vercel.json
└─ src/
   ├─ main.jsx
   ├─ index.css
   ├─ App.jsx
   └─ App.css
```

## Links
- Deploy: https://atividade-projeto-react-02.vercel.app
- Repositório da disciplina: [senai_framework_frontend](https://github.com/jenifferCamar/senai_framework_frontend)
