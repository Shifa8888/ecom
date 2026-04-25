import { useEffect, useState } from "react";
import { AppProviders, useAuth, useRouter } from "./context/AppContext";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Wishlist } from "./pages/Wishlist";
import { Search } from "./pages/Search";
import { Orders } from "./pages/Orders";
import { Account } from "./pages/Account";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${p})` }} />;
}

function Shell() {
  const { user } = useAuth();
  const { path } = useRouter();

  // scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [path]);

  if (!user) return <Login />;

  // Route resolution
  let page;
  // Strip query string for matching
  const [pathname, search] = path.split("?");
  const params = new URLSearchParams(search || "");

  if (pathname === "/" || pathname === "") {
    page = <Home />;
  } else if (pathname.startsWith("/category/")) {
    const id = pathname.replace("/category/", "").split("/")[0];
    page = <Category id={id} />;
  } else if (pathname.startsWith("/product/")) {
    const id = pathname.replace("/product/", "").split("/")[0];
    page = <ProductPage id={id} />;
  } else if (pathname === "/cart") {
    page = <Cart />;
  } else if (pathname === "/checkout") {
    page = <Checkout />;
  } else if (pathname === "/wishlist") {
    page = <Wishlist />;
  } else if (pathname === "/orders") {
    page = <Orders />;
  } else if (pathname === "/account") {
    page = <Account />;
  } else if (pathname === "/about") {
    page = <About />;
  } else if (pathname === "/contact") {
    page = <Contact />;
  } else if (pathname === "/search") {
    page = <Search query={params.get("q") || ""} />;
  } else {
    page = (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center page-enter">
        <div className="text-7xl mb-4 float inline-block">🌌</div>
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="muted mb-6">The page you're looking for doesn't exist.</p>
        <a href="#/" className="theme-btn-primary inline-block px-5 py-2.5">Back home</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg)" }}>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1" key={path}>
        {page}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Shell />
    </AppProviders>
  );
}
