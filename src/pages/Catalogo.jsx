import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";

export default function Catalogo() {
  const [category, setCategory] = useState("Todos");
  const filtered = category === "Todos" ? products : products.filter(p => p.category === category);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">NUESTRO MENÚ</span>
          <h1>Elige lo que se te antoje</h1>
          <p>Personaliza tus productos antes de agregarlos al pedido.</p>
        </div>
        <Link className="button secondary" to="/pedido">Ver pedido →</Link>
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <button key={cat} className={category === cat ? "tab active" : "tab"} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}