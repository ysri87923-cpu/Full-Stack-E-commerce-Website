import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

const categories = ["All", "Accessories", "Electronics", "Fashion", "Home"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ q: search, category, sort });
        const response = await fetch(`/api/products?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Could not load products.");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Please try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    const timer = setTimeout(loadProducts, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, category, sort]);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">THE EVERYDAY EDIT · 2026</span>
            <h1>Good things.<br /><em>Everyday.</em></h1>
            <p>Discover useful, thoughtful pieces that make everyday moments feel a little more special.</p>
            <a className="button button-dark" href="#products">Explore collection <span>↗</span></a>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=82"
              alt="Carefully styled everyday fashion and accessories"
              fetchPriority="high"
            />
            <div className="hero-note"><span>CURATED FOR YOU</span><strong>Simple things,<br />better living.</strong></div>
          </div>
          <div className="hero-side-label">SHOP THE LITTLE THINGS THAT MATTER</div>
        </div>
      </section>

      <section className="container collection-section" id="products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR FAVOURITE</span>
            <h2>The collection<span className="brand-dot">.</span></h2>
          </div>
          <p>Useful pieces. Considered design.<br />Made for your everyday.</p>
        </div>

        <div className="catalog-tools">
          <div className="category-list" aria-label="Filter by category">
            {categories.map((item) => (
              <button key={item} className={category === item ? "category-chip active" : "category-chip"}
                onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <div className="catalog-controls">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..." aria-label="Search products" />
            </label>
            <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>

        {loading ? <div className="state-message">Loading the collection…</div> :
          error ? <div className="state-message error">{error} Make sure the server is running.</div> :
          products.length === 0 ? <div className="state-message">No products found. Try another search.</div> :
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        }
      </section>
      <section className="feature-strip">
        <div className="container feature-grid">
          <div><span>01</span><strong>Thoughtful picks</strong><p>Everyday essentials, selected with care.</p></div>
          <div><span>02</span><strong>Easy browsing</strong><p>Find what you need without the clutter.</p></div>
          <div><span>03</span><strong>Made for you</strong><p>A simple shopping experience on any screen.</p></div>
        </div>
      </section>
    </>
  );
}
