import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard, { type Product } from '../components/ProductCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/products`).then((res) => setProducts(res.data.data || res.data)).catch(() => setProducts(sampleProducts))
  }, [])

  return (
    <div className="container-responsive py-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Loja de Esportes</h1>
          <p className="text-neutral-500">Encontre os melhores produtos esportivos</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Camiseta Esportiva', description: 'Tecnologia dry-fit, ideal para treinos', price: 79.9, imageUrl: 'https://images.unsplash.com/photo-1520975657283-cd7c79d58a49?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, name: 'Tênis de Corrida', description: 'Amortecimento premium e leveza', price: 499.9, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, name: 'Bola de Futebol', description: 'Costurada à mão, oficial tamanho 5', price: 129.9, imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, name: 'Shorts de Treino', description: 'Tecido respirável e confortável', price: 89.9, imageUrl: 'https://images.unsplash.com/photo-1520975744401-5e31e9e1b8df?q=80&w=1200&auto=format&fit=crop' },
]

