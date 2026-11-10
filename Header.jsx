import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { totalItems } = useCart();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Shopora home">
          <span className="brand-mark">s</span> shopora<span className="brand-dot">.</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Discover</NavLink>
          <a href="/#products">Shop</a>
        </nav>
        <Link to="/cart" className="cart-link" aria-label={`Shopping cart with ${totalItems} items`}>
          <span aria-hidden="true">Bag</span>
          <span className="cart-count">{totalItems}</span>
        </Link>
      </div>
    </header>
  );
}
