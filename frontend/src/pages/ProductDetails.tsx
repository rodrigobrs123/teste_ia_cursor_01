import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import type { Product } from '../components/ProductCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    axios.get(`${API_URL}/products/${id}`).then((res) => setProduct(res.data)).catch(() => setProduct(sample))
  }, [id])

  if (!product) return null

  return (
    <div className="container-responsive py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img src={product.imageUrl} alt={`Imagem de ${product.name}`} className="w-full rounded-xl object-cover aspect-square" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-neutral-600 mt-4">{product.description}</p>
        <div className="mt-6 text-2xl font-bold">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
        <div className="mt-8 flex gap-4">
          <button className="btn-primary">Adicionar ao carrinho</button>
          <Link to="/checkout" className="btn-primary">Comprar agora</Link>
        </div>
      </div>
    </div>
  )
}

const sample: Product = { id: 1, name: 'Camiseta Esportiva', description: 'Tecnologia dry-fit, ideal para treinos', price: 79.9, imageUrl: 'https://images.unsplash.com/photo-1520975657283-cd7c79d58a49?q=80&w=1200&auto=format&fit=crop' }

