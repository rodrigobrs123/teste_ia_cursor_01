import { Link } from 'react-router-dom'

export default function Cart() {
  // Placeholder cart summary
  const total = 0
  return (
    <div className="container-responsive py-10">
      <h1 className="text-2xl font-bold">Carrinho</h1>
      <p className="text-neutral-500 mt-2">Seu carrinho está vazio.</p>
      <div className="mt-6">
        <Link to="/" className="btn-primary">Continuar comprando</Link>
      </div>
      <div className="mt-10 card p-6">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-bold">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      </div>
    </div>
  )
}

