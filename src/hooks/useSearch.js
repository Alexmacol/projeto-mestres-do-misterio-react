import { useEffect, useRef, useState } from 'react'

function useSearch() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentSearch, setCurrentSearch] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const abortControllerRef = useRef(null)

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const search = async (subgenre, searchType) => {
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    setIsLoading(true)
    setCurrentSearch({ subgenre, searchType })
    setResult(null)
    setError('')

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subgenre, searchType }),
        signal: controller.signal,
      }).catch(() => {
        throw new Error(
          'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.',
        )
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.error || 'Falha na comunicação com o servidor.',
        )
      }

      const data = await response.json()

      const isValid =
        (searchType === 'escritores' && Array.isArray(data)) ||
        (searchType === 'subgenero' && Boolean(data.description))

      if (!isValid) {
        throw new Error('Formato de resposta inesperado do servidor.')
      }

      setResult(data)
    } catch (caughtError) {
      if (controller.signal.aborted) return
      setError(caughtError.message || 'Ocorreu um erro. Tente novamente.')
    } finally {
      if (!controller.signal.aborted) setIsLoading(false)
    }
  }

  return { search, isLoading, currentSearch, result, error }
}

export default useSearch
