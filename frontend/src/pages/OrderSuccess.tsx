import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <div className="container-responsive py-20 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-green-600"><path fillRule="evenodd" d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm14.03-2.78a.75.75 0 10-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25z" clipRule="evenodd" /></svg>
      </div>
      <h1 className="mt-6 text-2xl font-bold">Pagamento confirmado!</h1>
      <p className="mt-2 text-neutral-600">Obrigado pela sua compra. Enviamos um e-mail com os detalhes do pedido.</p>
      <div className="mt-6">
        <Link to="/" className="btn-primary">Voltar à loja</Link>
      </div>
    </div>
  )
}

