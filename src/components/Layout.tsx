import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  const { pathname } = useLocation();
  const home = pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header overlay={home} />
      <main id="main" className={home ? "home" : "page"}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
