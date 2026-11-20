import AuthorCard from './AuthorCard.jsx'
import DescriptionCard from './DescriptionCard.jsx'

function ResultsSection({ isLoading, searchType, subgenreName, result }) {
  if (!isLoading && !result) return null

  const heading =
    searchType === 'subgenero' ? 'Sobre o Subgênero' : 'Mestres do Subgênero'

  return (
    <section id="results-section" className="container">
      <h2 className="results-title">
        {isLoading ? (
          'Investigação em andamento...'
        ) : (
          <>
            {heading} {subgenreName}
            <span className="disclaimer">
              (Informações geradas por IA podem não ser 100% precisas.)
            </span>
          </>
        )}
      </h2>

      <div className="card-grid">
        {result && searchType === 'subgenero' && (
          <DescriptionCard description={result.description} />
        )}
        {result &&
          searchType === 'escritores' &&
          result.map((author, index) => (
            <AuthorCard key={author.name} author={author} index={index} />
          ))}
      </div>
    </section>
  )
}

export default ResultsSection
