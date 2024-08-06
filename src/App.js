import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import ShopCategory from './components/Pages/ShopCategory';
import Product from './components/Pages/Product';
import Cart from './components/Pages/Cart';
import LoginSignup from './components/Pages/LoginSignup';
import Home from './components/Pages/Home';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/T-shirt' element={<ShopCategory category="T-shirt"/>}/>
        <Route path='/Jeans' element={<ShopCategory category="Jeans"/>}/>
        <Route path='/Jackets' element={<ShopCategory category="Jackets"/>}/>
        <Route path='/Shoes' element={<ShopCategory category="Shoes"/>}/>
        <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
