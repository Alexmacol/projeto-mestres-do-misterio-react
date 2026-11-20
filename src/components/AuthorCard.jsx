import { Fragment, useState } from 'react'
import formatAuthorDates from '../utils/formatAuthorDates.js'

function AuthorCard({ author, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const detailsId = `details-${index + 1}`
  const dateLines = formatAuthorDates(author.dates)

  return (
    <div
      className={isExpanded ? 'card expanded' : 'card'}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="card-header">
        <h3>{author.name}</h3>
        <span className="dates">
          {dateLines.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {lineIndex > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </span>
      </div>

      <div className="card-details" id={detailsId}>
        <p>{author.description}</p>
        <h4>
          <i className="fas fa-book-open" /> Principais Obras
        </h4>
        <ul>
          {author.works.map((work, workIndex) => (
            <li key={workIndex}>{work}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="toggle-btn"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Ocultar detalhes' : 'Saiba mais'}{' '}
        <i className="fas fa-chevron-down" />
      </button>
    </div>
  )
}

export default AuthorCard
