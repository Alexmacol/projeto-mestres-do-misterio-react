import { Fragment } from 'react'

function renderLineBreaks(text) {
  return text.split('\n').map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ))
}

function renderItalics(text) {
  const parts = text.split(/(<i>[\s\S]*?<\/i>|`[^`]+`)/)

  return parts.map((part, index) => {
    const isItalic = index % 2 === 1

    if (!isItalic) {
      return <Fragment key={index}>{renderLineBreaks(part)}</Fragment>
    }

    const inner = part.startsWith('<i>') ? part.slice(3, -4) : part.slice(1, -1)

    return <i key={index}>{renderLineBreaks(inner)}</i>
  })
}

function DescriptionCard({ description }) {
  return (
    <div className="card description-card">
      <h2>Uma Análise Profunda</h2>
      <p>{renderItalics(description)}</p>
    </div>
  )
}

export default DescriptionCard
