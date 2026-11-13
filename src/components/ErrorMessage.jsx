function ErrorMessage({ message }) {
  return (
    <div className="state-message">
      <p className="error-message" role="alert">
        <i className="fas fa-exclamation-triangle" /> {message}
      </p>
    </div>
  )
}

export default ErrorMessage
