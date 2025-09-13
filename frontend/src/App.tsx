import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="bg-white/80 backdrop-blur border-b border-neutral-200 sticky top-0 z-40">
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
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-neutral-200 mt-14">
        <div className="container-responsive py-10 text-sm text-neutral-500">
          © {new Date().getFullYear()} SportsStore. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}

export default App
