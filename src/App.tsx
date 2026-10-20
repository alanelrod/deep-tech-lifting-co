import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CartProvider } from "./context/CartContext";
import { About } from "./pages/About";
import { Checkout } from "./pages/Checkout";
import { Collections } from "./pages/Collections";
import { Home } from "./pages/Home";
import { InfoPage } from "./pages/InfoPage";
import { NotFound } from "./pages/NotFound";
import { ProductPage } from "./pages/ProductPage";
import { Shop } from "./pages/Shop";

export function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/support" element={<InfoPage />} />
            <Route path="/shipping" element={<InfoPage />} />
            <Route path="/returns" element={<InfoPage />} />
            <Route path="/privacy" element={<InfoPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
