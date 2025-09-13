import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export default function Checkout() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function onPay() {
    try {
      setLoading(true)
      const res = await axios.post(`${API_URL}/checkout`, {
        items: [
          { product_id: 1, quantity: 1 },
        ],
        customer: { name, email }
      })

      const paymentUrl = res.data?.payment?.payment_url || res.data?.payment_url
      if (paymentUrl) {
        window.location.href = paymentUrl
      } else {
        navigate('/success')
      }
    } catch (e) {
      alert('Falha ao iniciar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-responsive py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 card p-6">
        <h1 className="text-xl font-bold">Checkout</h1>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]" />
          </div>
        </div>

        <button onClick={onPay} className="btn-primary mt-6" disabled={loading}>
          {loading ? 'Processando...' : 'Pagar' }
        </button>
      </div>
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-bold">R$ 79,90</span>
        </div>
      </div>
    </div>
  )
}

