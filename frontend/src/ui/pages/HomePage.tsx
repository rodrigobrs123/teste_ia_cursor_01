import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'

type Product = {
  id: number
  name: string
  description: string
  price_cents: number
  image_url: string
}

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

export function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get<{ data: Product[] }>('/products')
      return res.data.data
    }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold title-gradient">Equipamentos esportivos premium</h1>
        <p className="text-neutral-400 mt-2">Performance, conforto e estilo para seu treino.</p>
      </div>

      {isLoading && <p>Carregando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image_url} alt={p.name} className="h-48 w-full object-cover rounded-md" />
            <div className="mt-4">
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-neutral-400 text-sm line-clamp-2">{p.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-semibold">{formatPrice(p.price_cents)}</span>
                <Link to={`/produto/${p.id}`} className="btn-primary">Ver detalhes</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

