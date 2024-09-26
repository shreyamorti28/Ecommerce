import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Home from './Pages/Home';
import Footer from './components/Footer/Footer';
import tshirt_banner from './components/Assets/tshirt_banner.jpg';
import shoes_banner from './components/Assets/shoes_banner.jpg';
import jeans_banner from './components/Assets/jeans_banner.jpg';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Fetch data when component mounts
    fetch('https://ecommerce-igcpp5nng-shreyamorti28s-projects.vercel.app')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/T-shirt' element={<ShopCategory banner={tshirt_banner} category="T-shirt" />} />
          <Route path='/Jeans' element={<ShopCategory banner={jeans_banner} category="Jeans" />} />
          <Route path='/Shoes' element={<ShopCategory banner={shoes_banner} category="Shoes" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
