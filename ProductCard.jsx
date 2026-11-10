import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image-wrap">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
        </div>
      </Link>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-bottom">
          <div className="price-line">
            <strong>{money(product.price)}</strong>
            <del>{money(product.oldPrice)}</del>
          </div>
          <span className="rating">★ {product.rating}</span>
        </div>
        <button className="button button-small button-outline" onClick={() => addToCart(product)}>
          Add to bag
        </button>
      </div>
    </article>
  );
}
