import { Link } from 'react-router-dom'

export function SuccessPage() {
  return (
    <div className="max-w-lg mx-auto text-center card">
      <h1 className="text-3xl font-semibold mb-2 title-gradient">Pedido confirmado!</h1>
      <p className="text-neutral-400">Seu pagamento foi processado com sucesso e seu pedido está sendo preparado.</p>
      <Link to="/" className="btn-primary mt-6 inline-block">Voltar à loja</Link>
    </div>
  )
}

