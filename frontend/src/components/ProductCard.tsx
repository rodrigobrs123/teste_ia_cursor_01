import { Link } from 'react-router-dom'

export type Product = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  categoryName?: string
}

export default function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart?: (p: Product) => void }) {
  return (
    <div className="card overflow-hidden">
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform hover:scale-105" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block font-semibold hover:text-[hsl(var(--brand))]">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <button className="btn-primary" onClick={() => onAddToCart?.(product)}>Adicionar</button>
        </div>
      </div>
    </div>
  )
}

