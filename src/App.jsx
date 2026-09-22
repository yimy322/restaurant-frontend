import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservas from "./pages/Reservas";
import Contacto from "./pages/Contacto";
import Login from "./pages/admin/Login";
import RequireAuth from "./components/RequireAuth";
import AdminHome from "./pages/admin/AdminHome";
import AdminDishes from "./pages/admin/AdminDishes";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminReservations from "./pages/admin/AdminReservations";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/reservas" element={<Reservas />} /> 
          <Route path="/contacto" element={<Contacto />} /> 
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<RequireAuth><AdminHome/></RequireAuth>}/>
          <Route path="/admin/platos" element={<RequireAuth><AdminDishes/></RequireAuth>}/>
          <Route path="/admin/categorias" element={<RequireAuth><AdminCategories/></RequireAuth>}/>
          <Route path="/admin/reservas" element={<RequireAuth><AdminReservations/></RequireAuth>}/>
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;