import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

type Product = { id: number; name: string; price_cents: number; image_url: string }
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

export function CartPage() {
  const [items, setItems] = useState<{ id: number; quantity: number }[]>([])
  const [products, setProducts] = useState<Record<number, Product>>({})

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    const cart = stored ? JSON.parse(stored) : []
    setItems(cart)
    if (cart.length > 0) {
      const ids = cart.map((i: any) => i.id).join(',')
      api.get<{ data: Product[] }>(`/products/bulk?ids=${ids}`).then((res) => {
        const byId: Record<number, Product> = {}
        res.data.data.forEach((p) => (byId[p.id] = p))
        setProducts(byId)
      })
    }
  }, [])

  const setQuantity = (id: number, quantity: number) => {
    const next = items.map((i) => (i.id === id ? { ...i, quantity } : i))
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const removeItem = (id: number) => {
    const next = items.filter((i) => i.id !== id)
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const totalCents = items.reduce((sum, i) => sum + (products[i.id]?.price_cents || 0) * i.quantity, 0)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Seu carrinho</h1>
      {items.length === 0 ? (
        <div className="card">
          <p className="text-neutral-400">Seu carrinho está vazio.</p>
          <Link to="/" className="btn-primary mt-4 inline-block">Continuar comprando</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((i) => {
              const p = products[i.id]
              if (!p) return null
              return (
                <div key={i.id} className="card flex items-center gap-4">
                  <img src={p.image_url} className="h-20 w-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-neutral-400">{formatPrice(p.price_cents)}</p>
                  </div>
                  <input type="number" min={1} value={i.quantity} onChange={(e) => setQuantity(i.id, Number(e.target.value))} className="w-16 bg-neutral-900 border border-neutral-700 rounded px-2 py-1" />
                  <button onClick={() => removeItem(i.id)} className="btn-outline">Remover</button>
                </div>
              )
            })}
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="text-xl font-bold">{formatPrice(totalCents)}</span>
            </div>
            <Link to="/checkout" className="btn-primary mt-4 inline-block w-full text-center">Ir para checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

