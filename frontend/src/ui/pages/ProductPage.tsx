import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

type Product = {
  id: number
  name: string
  description: string
  price_cents: number
  image_url: string
  stock: number
}

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

export function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await api.get<{ data: Product }>(`/products/${id}`)
      return res.data.data
    }
  })

  if (isLoading) return <p>Carregando...</p>
  if (!product) return <p>Produto não encontrado</p>

  const addToCart = () => {
    const stored = localStorage.getItem('cart')
    const cart: { id: number; quantity: number }[] = stored ? JSON.parse(stored) : []
    const existing = cart.find((i) => i.id === product.id)
    if (existing) existing.quantity += 1
    else cart.push({ id: product.id, quantity: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/carrinho')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <img src={product.image_url} alt={product.name} className="w-full h-80 object-cover rounded-xl" />
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-neutral-400 mt-2">{product.description}</p>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-2xl font-bold">{formatPrice(product.price_cents)}</span>
          <span className="text-sm text-neutral-400">Estoque: {product.stock}</span>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button className="btn-primary" onClick={addToCart}>Adicionar ao carrinho</button>
          <Link to="/" className="btn-outline">Voltar</Link>
        </div>
      </div>
    </div>
  )
}

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

