function StatusMessage({ message }) {
  return (
    <p id="status-message" className="visually-hidden" role="status">
      {message}
    </p>
  )
}

export default StatusMessage
