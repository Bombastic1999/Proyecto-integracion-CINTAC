import { useState } from 'react'

const Cotizador = () => {
  const [origen, setOrigen] = useState('')
  const [peso, setPeso] = useState('')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState('')

  const handleCotizar = async (e) => {
    e.preventDefault()
    setError('')
    setResultado(null)

    if (!peso || Number(peso) <= 0) {
      setError('Ingrese un peso mayor que cero.')
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/cotizar/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origen,
          peso_toneladas: peso,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al cotizar')
        return
      }

      setResultado(data)
    } catch {
      setError('Error de conexión con el servidor. ¿Está Django corriendo?')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-orange-600">CINTAC COMEX</h1>
        <p className="mt-2 text-lg text-gray-500">Cotizador Interno de Fletes Marítimos</p>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-xl border-t-4 border-orange-500 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-700">Nueva Cotización</h2>

          <form onSubmit={handleCotizar} className="space-y-5">
            <div>
              <label htmlFor="origen" className="mb-1 block text-sm font-medium text-gray-600">
                Puerto de Origen
              </label>
              <select
                id="origen"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                required
              >
                <option value="">Seleccione origen...</option>
                <option value="Shanghai">Shanghai, China</option>
                <option value="Ningbo">Ningbo, China</option>
                <option value="Tokio">Tokio, Japón</option>
              </select>
            </div>

            <div>
              <label htmlFor="destino" className="mb-1 block text-sm font-medium text-gray-600">
                Puerto de Destino
              </label>
              <input
                id="destino"
                type="text"
                value="San Antonio / Valparaíso"
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="peso" className="mb-1 block text-sm font-medium text-gray-600">
                Peso Total (Toneladas)
              </label>
              <input
                id="peso"
                type="number"
                min="0.1"
                step="0.1"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
              />
              <p className="mt-2 text-xs text-orange-600">
                Se aplicará el tope legal de 25 ton/contenedor.
              </p>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-orange-600 py-3 font-bold text-white shadow-md transition hover:bg-orange-700"
            >
              Calcular Flete
            </button>
          </form>
        </div>

        <div className="rounded-xl bg-gray-800 p-8 text-white shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-orange-500">Resumen de Cotización</h2>

          {error && <div className="mb-4 rounded bg-red-500 p-3 text-white">{error}</div>}

          {!resultado && !error ? (
            <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-600 text-gray-400">
              Ingrese datos para calcular.
            </div>
          ) : resultado ? (
            <div className="space-y-6">
              <div className="rounded-lg border-l-4 border-orange-500 bg-gray-700 p-5">
                <p className="text-sm text-gray-400">Logística Requerida</p>
                <p className="text-4xl font-bold">
                  {resultado.contenedores_requeridos}{' '}
                  <span className="text-xl text-gray-300">Contenedores</span>
                </p>
                <p className="mt-1 text-sm text-orange-400">
                  Recomendación: {resultado.tipo_recomendado}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-700 p-4">
                  <p className="text-xs text-gray-400">Tránsito</p>
                  <p className="text-lg font-semibold">{resultado.dias_transito}</p>
                </div>
                <div className="rounded-lg bg-gray-700 p-4">
                  <p className="text-xs text-gray-400">Costo Estimado (HQ)</p>
                  <p className="text-lg font-semibold">
                    ${resultado.costo_total_hq_usd.min} - ${resultado.costo_total_hq_usd.max}
                  </p>
                </div>
              </div>

              <p className="border-t border-gray-600 pt-4 text-xs text-gray-400">
                Fuente: {resultado.fuente}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Cotizador
