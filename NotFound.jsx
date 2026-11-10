import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>Looks like this<br /><em>page wandered off.</em></h1>
      <Link className="button button-dark" to="/">Back to home</Link>
    </section>
  );
}
