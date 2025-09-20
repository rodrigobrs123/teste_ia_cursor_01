import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import { AppLayout } from './ui/AppLayout'
import { HomePage } from './ui/pages/HomePage'
import { ProductPage } from './ui/pages/ProductPage'
import { CartPage } from './ui/pages/CartPage'
import { CheckoutPage } from './ui/pages/CheckoutPage'
import { SuccessPage } from './ui/pages/SuccessPage'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'produto/:id', element: <ProductPage /> },
      { path: 'carrinho', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'sucesso', element: <SuccessPage /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<OrderSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
