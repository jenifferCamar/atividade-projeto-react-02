import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'aula09_tarefas_v1'

function gerarId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function App() {
  const [tarefas, setTarefas] = useState([])
  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState('Estudos')
  const [filtro, setFiltro] = useState('todas')
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // useEffect: carregar dados do localStorage na montagem
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY)
      if (salvo) {
        const parsed = JSON.parse(salvo)
        if (Array.isArray(parsed)) setTarefas(parsed)
      }
    } catch (e) {
      setErro('Não foi possível carregar as tarefas salvas.')
    } finally {
      const t = setTimeout(() => setCarregando(false), 400)
      return () => clearTimeout(t)
    }
  }, [])

  // useEffect: persistir tarefas sempre que mudarem (após carga inicial)
  useEffect(() => {
    if (!carregando) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas))
    }
  }, [tarefas, carregando])

  function handleSubmit(e) {
    e.preventDefault()
    const nome = titulo.trim()
    if (!nome) {
      setErro('Digite um título para a tarefa.')
      return
    }
    setErro('')
    const nova = {
      id: gerarId(),
      titulo: nome,
      categoria,
      concluida: false,
      criadaEm: new Date().toISOString(),
    }
    setTarefas((prev) => [nova, ...prev])
    setTitulo('')
    setCategoria('Estudos')
  }

  function alternar(id) {
    setTarefas((prev) => prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)))
  }

  function remover(id) {
    setTarefas((prev) => prev.filter((t) => t.id !== id))
  }

  function limparConcluidas() {
    setTarefas((prev) => prev.filter((t) => !t.concluida))
  }

  const tarefasFiltradas = useMemo(() => {
    return tarefas.filter((t) => {
      const matchFiltro =
        filtro === 'todas' || (filtro === 'ativas' && !t.concluida) || (filtro === 'concluidas' && t.concluida)
      const q = busca.trim().toLowerCase()
      const matchBusca = !q || t.titulo.toLowerCase().includes(q) || t.categoria.toLowerCase().includes(q)
      return matchFiltro && matchBusca
    })
  }, [tarefas, filtro, busca])

  const total = tarefas.length
  const concluidas = tarefas.filter((t) => t.concluida).length
  const ativas = total - concluidas

  return (
    <div className="app">
      <header className="header">
        <h1>Projeto React 02</h1>
        <p>Gerenciador de tarefas — <code>useState</code>, eventos, formulário controlado e <code>useEffect</code></p>
      </header>

      <main className="container">
        <section className="card">
          <h2>Nova tarefa</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Título</span>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex.: Estudar useEffect"
                aria-label="Título da tarefa"
              />
            </label>
            <label className="field">
              <span>Categoria</span>
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)} aria-label="Categoria">
                <option>Estudos</option>
                <option>Trabalho</option>
                <option>Pessoal</option>
                <option>Projeto</option>
              </select>
            </label>
            <button type="submit" className="btn primary">Adicionar</button>
          </form>
          {erro && <p className="alert erro" role="alert">{erro}</p>}
        </section>

        <section className="card">
          <div className="toolbar">
            <div className="stats" aria-label="Resumo">
              <span>Total: <strong>{total}</strong></span>
              <span>Ativas: <strong>{ativas}</strong></span>
              <span>Concluídas: <strong>{concluidas}</strong></span>
            </div>
            <input
              className="busca"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por título ou categoria"
              aria-label="Buscar tarefas"
            />
          </div>

          <div className="filtros" role="group" aria-label="Filtros">
            <button type="button" className={filtro === 'todas' ? 'btn active' : 'btn'} onClick={() => setFiltro('todas')}>Todas</button>
            <button type="button" className={filtro === 'ativas' ? 'btn active' : 'btn'} onClick={() => setFiltro('ativas')}>Ativas</button>
            <button type="button" className={filtro === 'concluidas' ? 'btn active' : 'btn'} onClick={() => setFiltro('concluidas')}>Concluídas</button>
            <button type="button" className="btn danger" onClick={limparConcluidas} disabled={concluidas === 0}>Limpar concluídas</button>
          </div>

          {carregando ? (
            <p className="estado">Carregando tarefas...</p>
          ) : tarefas.length === 0 ? (
            <p className="estado">Nenhuma tarefa cadastrada. Adicione a primeira acima.</p>
          ) : tarefasFiltradas.length === 0 ? (
            <p className="estado">Nenhuma tarefa encontrada para o filtro/busca atual.</p>
          ) : (
            <ul className="lista">
              {tarefasFiltradas.map((tarefa) => (
                <li key={tarefa.id} className={tarefa.concluida ? 'item concluida' : 'item'}>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={tarefa.concluida}
                      onChange={() => alternar(tarefa.id)}
                      aria-label={`Marcar ${tarefa.titulo} como concluída`}
                    />
                    <span className="texto">
                      <strong>{tarefa.titulo}</strong>
                      <small>{tarefa.categoria}</small>
                    </span>
                  </label>
                  <button type="button" className="btn danger small" onClick={() => remover(tarefa.id)} aria-label={`Remover ${tarefa.titulo}`}>Remover</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card info">
          <h2>Conceitos demonstrados</h2>
          <ul>
            <li><strong>useState:</strong> tarefas, formulário, filtro, busca, loading e erro.</li>
            <li><strong>Eventos:</strong> <code>onSubmit</code>, <code>onChange</code>, <code>onClick</code>.</li>
            <li><strong>Formulário controlado:</strong> inputs vinculados ao estado.</li>
            <li><strong>useEffect:</strong> carregar e persistir tarefas no <code>localStorage</code>.</li>
            <li><strong>Listas e keys:</strong> <code>map()</code> com <code>key</code> estável.</li>
            <li><strong>Renderização condicional:</strong> loading, vazio, sem resultados e mensagens de erro.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
