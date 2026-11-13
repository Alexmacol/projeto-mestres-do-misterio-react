import Hero from './components/Hero.jsx'
import SearchControls from './components/SearchControls.jsx'
import StatusMessage from './components/StatusMessage.jsx'
import Footer from './components/Footer.jsx'
import useSearch from './hooks/useSearch.js'
import subgenres from './data/data.json'

function App() {
  const { search, isLoading, currentSearch, result, error } = useSearch()

  let statusMessage = ''

  if (isLoading) {
    statusMessage = 'Investigação em andamento...'
  } else if (result && currentSearch) {
    const subgenreName = subgenres.find(
      (item) => item.id === currentSearch.subgenre,
    ).name

    statusMessage =
      currentSearch.searchType === 'subgenero'
        ? `Análise do subgênero ${subgenreName} pronta.`
        : `Lista de escritores do subgênero ${subgenreName} pronta.`
  }

  return (
    <>
      <header>
        <Hero />
      </header>
      <main>
        <StatusMessage message={statusMessage} />
        <SearchControls
          onSearch={search}
          isLoading={isLoading}
          activeSearchType={currentSearch?.searchType}
          error={error}
          hasResult={result !== null}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
