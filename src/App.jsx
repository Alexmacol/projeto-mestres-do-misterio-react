import Hero from './components/Hero.jsx'
import SearchControls from './components/SearchControls.jsx'
import Footer from './components/Footer.jsx'
import useSearch from './hooks/useSearch.js'

function App() {
  const { search, isLoading, currentSearch } = useSearch()

  return (
    <>
      <header>
        <Hero />
      </header>
      <main>
        <SearchControls
          onSearch={search}
          isLoading={isLoading}
          activeSearchType={currentSearch?.searchType}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
