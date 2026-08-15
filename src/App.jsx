import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

import Home from './pages/Home'
import NotFound from './pages/404'
import ProductDetail from './pages/ProductDetail'
import Collection from './pages/Collection'
import CheckoutMock from './pages/CheckoutMock'
import TrackOrder from './pages/TrackOrder'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className="app-wrapper">
      <Header onCartClick={toggleCart} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:handle" element={<ProductDetail />} />
          <Route path="/collections/:handle" element={<Collection />} />
          <Route path="/checkout" element={<CheckoutMock />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default App
