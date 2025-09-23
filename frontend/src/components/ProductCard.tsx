import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, loading } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  const currentPrice = product.sale_price || product.price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.images[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {product.featured && (
              <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                Destaque
              </span>
            )}
            {!product.in_stock && (
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                Esgotado
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <HeartIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock || loading}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              <span>{loading ? 'Adicionando...' : 'Adicionar'}</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
          )}

          {/* Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-bold text-gray-900">
              R$ {currentPrice.toFixed(2).replace('.', ',')}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {/* Stock Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-xs text-gray-600">
                {product.in_stock ? 'Em estoque' : 'Esgotado'}
              </span>
            </div>
            
            {product.stock_quantity <= 5 && product.in_stock && (
              <span className="text-xs text-orange-600 font-medium">
                Últimas {product.stock_quantity} unidades
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;