function Footer() {
  return (
    <footer>
      <section>
        <div className="container footer-content">
          <p>&copy; 2026 Mestres do Mistério. Todos os direitos reservados.</p>
          <ul className="footer-links">
            <li>
              <a
                href="https://github.com/Alexmacol"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="footer-github"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 -.546-1.387-1.333-1.757-1.333-1.757 -1.087-.744.084-.729.084-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997 .108-.776.417-1.305.76-1.604 -2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22 -.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23 a11.52 11.52 0 013.003-.404 c1.02.005 2.047.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23 .645 1.653.24 2.873.12 3.176 .765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92 .42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57 C20.565 22.092 24 17.592 24 12.297 c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="mailto:alexmacol@gmail.com"
                aria-label="Email"
                className="footer-email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.01-8-5.01V6h16zm0 12H4V8.489l7.386 4.622a2.01 2.01 0 002.228 0L20 8.489V18z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  )
}

export default Footer
