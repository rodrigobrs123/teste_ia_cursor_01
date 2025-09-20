import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Product = { id: number; name: string; price_cents: number }
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

export function CheckoutPage() {
  const [items, setItems] = useState<{ id: number; quantity: number }[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    setItems(stored ? JSON.parse(stored) : [])
  }, [])

  const handleCheckout = async () => {
    try {
      setLoading(true)
      const res = await api.post('/checkout', { items })
      const { payment_url } = res.data
      window.location.href = payment_url
    } catch (e) {
      alert('Erro ao iniciar pagamento')
      setLoading(false)
    }
  }

  const totalCents = 0

  return (
    <div className="max-w-xl mx-auto card">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <p className="text-neutral-400 mb-4">Confirme seus itens e prossiga para o pagamento seguro.</p>
      <button className="btn-primary w-full" onClick={handleCheckout} disabled={loading || items.length === 0}>
        {loading ? 'Redirecionando...' : 'Pagar com Nuvem Pago'}
      </button>
      <button className="btn-outline w-full mt-3" onClick={() => navigate('/carrinho')}>Voltar ao carrinho</button>
    </div>
  )
}

