import { useState } from 'react'
import subgenres from '../data/data.json'
import ErrorMessage from './ErrorMessage.jsx'

function SearchControls({
  onSearch,
  isLoading,
  activeSearchType,
  error,
  hasResult,
}) {
  const [subgenre, setSubgenre] = useState('')

  const hasSubgenre = subgenre !== ''
  const showInitialMessage = !isLoading && !hasResult && !error

  const handleSearch = async (searchType) => {
    await onSearch(subgenre, searchType)
    setSubgenre('')
  }

  return (
    <section id="search-controls" className="container">
      <div className="control-box">
        <h2>Escolha um Subgênero</h2>
        <div className="input-group">
          <label htmlFor="subgenre-select" className="visually-hidden">
            Escolha um subgênero de mistério
          </label>
          <select
            id="subgenre-select"
            value={subgenre}
            onChange={(event) => setSubgenre(event.target.value)}
            disabled={isLoading}
          >
            <option value="">Selecione um subgênero...</option>
            {subgenres.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="search-btn"
            disabled={!hasSubgenre || isLoading}
            onClick={() => handleSearch('subgenero')}
          >
            {isLoading && activeSearchType === 'subgenero' ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Investigando...
              </>
            ) : (
              <>
                <i className="fas fa-search" /> Buscar Subgênero
              </>
            )}
          </button>
          <button
            type="button"
            className="search-btn"
            disabled={!hasSubgenre || isLoading}
            onClick={() => handleSearch('escritores')}
          >
            {isLoading && activeSearchType === 'escritores' ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Investigando...
              </>
            ) : (
              <>
                <i className="fas fa-search" /> Buscar Escritores
              </>
            )}
          </button>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
      {showInitialMessage && (
        <div className="state-message">
          <p>Selecione um subgênero e escolha o que buscar</p>
        </div>
      )}
    </section>
  )
}

export default SearchControls
