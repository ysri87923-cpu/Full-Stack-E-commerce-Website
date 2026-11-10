import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

app.use(express.json());

async function getProducts() {
  const data = await readFile(path.join(__dirname, "products.json"), "utf-8");
  return JSON.parse(data);
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Shopora API is running" });
});

app.get("/api/products", async (req, res, next) => {
  try {
    let products = await getProducts();
    const { q = "", category = "All", sort = "featured" } = req.query;

    if (q.trim()) {
      const search = q.trim().toLowerCase();
      products = products.filter((product) =>
        `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search)
      );
    }

    if (category !== "All") {
      products = products.filter((product) => product.category === category);
    }

    if (sort === "price-low") products.sort((a, b) => a.price - b.price);
    if (sort === "price-high") products.sort((a, b) => b.price - a.price);
    if (sort === "rating") products.sort((a, b) => b.rating - a.rating);

    res.json({ count: products.length, products });
  } catch (error) {
    next(error);
  }
});

app.get("/api/products/:id", async (req, res, next) => {
  try {
    const products = await getProducts();
    const product = products.find((item) => item.id === req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Serve the optimized React build in production.
app.use(express.static(path.join(rootDir, "dist")));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(rootDir, "dist", "index.html"), (error) => {
    if (error) next(error);
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

app.listen(PORT, () => {
  console.log(`Shopora server running on port ${PORT}`);
});
