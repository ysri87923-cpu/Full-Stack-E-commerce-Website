import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;

export default function Cart() {
  const { cart, totalPrice, changeQuantity, removeFromCart } = useCart();

  return (
    <section className="container cart-section">
      <span className="eyebrow">YOUR PICKS</span>
      <h1>Your bag<span className="brand-dot">.</span></h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">♡</div>
          <h2>Your bag is waiting.</h2>
          <p>Explore the collection and add something you like.</p>
          <Link to="/" className="button button-dark">Continue shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>
                  <strong>{item.name}</strong>
                  <span>{money(item.price)}</span>
                  <div className="quantity-control">
                    <button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                  </div>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <h2>Order summary</h2>
            <div><span>Subtotal</span><strong>{money(totalPrice)}</strong></div>
            <div><span>Delivery</span><strong>Free</strong></div>
            <div className="summary-total"><span>Total</span><strong>{money(totalPrice)}</strong></div>
            <button className="button button-dark full-width" onClick={() => alert("This is a portfolio demo. Checkout and payment are not enabled.")}>
              Continue to checkout
            </button>
            <p>Checkout is a demo only. No payment details are collected.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
