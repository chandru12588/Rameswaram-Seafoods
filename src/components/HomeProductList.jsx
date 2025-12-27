import { useEffect, useState } from "react";
import api from "../utils/axiosClient";
import ProductCard from "./ProductCard";

export default function HomeProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">🐟 Our Fresh Products</h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <ProductCard key={p._id} item={p} />
        ))}
      </div>
    </section>
  );
}
