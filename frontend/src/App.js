import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import LoginSignup from "./Pages/LoginSignup";
import About from "./Components/About/About";
import TransactionHistory from "./Components/TransactionHistory/TransactionHistory"

export const backend_url = 'http://localhost:4000';
export const currency = 'Rp. ';

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/items" element={<ShopCategory banner={men_banner} category='Mesin'  />} />
          <Route path="/about" element={<About/>} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
          <Route path="/transactionhistory" element={<TransactionHistory/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
