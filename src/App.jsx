import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import SearchControls from './components/SearchControls.jsx'
import ResultsSection from './components/ResultsSection.jsx'
import StatusMessage from './components/StatusMessage.jsx'
import Footer from './components/Footer.jsx'
import useSearch from './hooks/useSearch.js'
import subgenres from './data/data.json'

function App() {
  const { search, isLoading, currentSearch, result, error } = useSearch()

  const subgenreName = currentSearch
    ? subgenres.find((item) => item.id === currentSearch.subgenre).name
    : ''

  let statusMessage = ''

  if (isLoading) {
    statusMessage = 'Investigação em andamento...'
  } else if (result && currentSearch) {
    statusMessage =
      currentSearch.searchType === 'subgenero'
        ? `Análise do subgênero ${subgenreName} pronta.`
        : `Lista de escritores do subgênero ${subgenreName} pronta.`
  }

  return (
    <>
      <Navbar />
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
        <ResultsSection
          isLoading={isLoading}
          searchType={currentSearch?.searchType}
          subgenreName={subgenreName}
          result={result}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
