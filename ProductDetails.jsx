import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/products/${id}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("This product could not be found.");
        return response.json();
      })
      .then(setProduct)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });
    return () => controller.abort();
  }, [id]);

  if (error) return <div className="container state-message error">{error} <Link to="/">Go back</Link></div>;
  if (!product) return <div className="container state-message">Loading product…</div>;

  return (
    <section className="container detail-section">
      <Link to="/" className="back-link">← Back to collection</Link>
      <div className="detail-layout">
        <div className="detail-image"><img src={product.image} alt={product.name} /></div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category.toUpperCase()}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating">★ {product.rating} <span>Customer rating</span></div>
          <div className="detail-price">{money(product.price)} <del>{money(product.oldPrice)}</del></div>
          <p>{product.description}</p>
          <button className="button button-dark" onClick={() => addToCart(product)}>Add to bag</button>
          <div className="detail-note">Demo store · No real payment is collected.</div>
        </div>
      </div>
    </section>
  );
}
