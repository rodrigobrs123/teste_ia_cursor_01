import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="container-responsive flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-[hsl(var(--brand))]"></div>
        <span className="text-lg font-bold">SportsStore</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-[hsl(var(--brand))]">Produtos</Link>
        <Link to="/cart" className="hover:text-[hsl(var(--brand))]">Carrinho</Link>
      </nav>
    </div>
  )
}

