function Hero() {
  return (
    <section id="intro-section" className="container hero-section">
      {/* Background */}
      <div className="hero-bg" />
      <div className="overlay-dark" />
      <div className="hero-content">
        <h1 className="main-title">Mestres do Mistério</h1>
        <div className="intro-box">
          <p>
            Explore o fascinante universo da{' '}
            <span className="highlight">literatura de mistério e suspense</span>,
            onde cada página revela segredos, enigmas e reviravoltas
            inesperadas.
          </p>
          <p>
            Conheça cada subgênero, dos clássicos detetives vitorianos aos
            modernos thrillers psicológicos, descubra os{' '}
            <span className="highlight-red">maiores escritores</span> que
            definiram e revolucionaram cada subgênero desta arte literária
            envolvente.
          </p>
        </div>
        <p className="call-to-action-text">
          Selecione um subgênero para conhecer mais sobre ele e seus mestres
        </p>
        <div className="dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  )
}

export default Hero
