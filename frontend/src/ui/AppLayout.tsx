import { Link, Outlet } from 'react-router-dom'
import { ShoppingCart, Dumbbell } from 'lucide-react'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-neutral-800 sticky top-0 z-40 bg-neutral-950/70 backdrop-blur">
        <div className="container-px mx-auto h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="text-primary-400" />
            <span className="font-semibold title-gradient">Sports Shop</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link to="/" className="btn-outline">Produtos</Link>
            <Link to="/carrinho" className="btn-primary">
              <ShoppingCart className="mr-2 h-4 w-4" /> Carrinho
            </Link>
          </nav>
        </div>
      </header>
      <main className="container-px mx-auto flex-1 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Sports Shop. Todos os direitos reservados.
      </footer>
    </div>
  )
}

