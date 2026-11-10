export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span className="footer-brand">shopora.</span>
        <span>Thoughtful finds for everyday living.</span>
        <span>© {new Date().getFullYear()} Shopora · Student capstone demo</span>
      </div>
    </footer>
  );
}
