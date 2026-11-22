const menuItems = [
  { id: 'intro-section', label: 'Início' },
  { id: 'search-controls', label: 'Buscar' },
  { id: 'contact', label: 'Contato' },
]

function Navbar() {
  return (
    <nav className="navbar" aria-label="Menu principal">
      <ul className="navbar-list">
        {menuItems.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
