import { useEffect, useState } from "react";
import api from "../utils/axiosClient";
import ProductCard from "./ProductCard";

export default function HomeProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await api.get("/products?available=true");
    setProducts(data);
  };

  return (
    <section className="section-shell py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-rose-700">Our Fresh Products</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p._id} item={p} />
        ))}
      </div>
    </section>
  );
}
