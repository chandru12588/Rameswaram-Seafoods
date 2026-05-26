import React, { useEffect, useState } from "react";
import api from "../utils/axiosClient";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await api.get("/products?available=true");
    setProducts(data);
  };

  const categories = [...new Set(products.map((p) => p.categoryId?.name).filter(Boolean))];

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => categoryFilter === "All" || p.categoryId?.name === categoryFilter);

  return (
    <div className="pt-28 pb-10 section-shell">
      <Seo
        title="Fresh Fish and Seafood Menu in Trichy"
        description="Browse fresh seafood prices in Trichy. Buy fish, prawns, crab and more from Rameswaram Fresh Seafoods."
        path="/products"
        keywords="trichy seafood menu, fish price trichy, seafood shop trichy, online fish order trichy"
      />
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900 fade-up">Fresh Meat and Seafood</h2>

      <div className="premium-card p-3 md:p-4 flex gap-3 mb-7 flex-wrap items-center fade-up-delay-1">
        <input
          placeholder="Search fish/meat..."
          className="input-polish p-3 flex-1 min-w-[230px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input-polish p-3 min-w-[160px]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch("");
            setCategoryFilter("All");
          }}
          className="px-4 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition font-medium"
        >
          Clear
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => <ProductCard key={p._id} item={p} />)
        ) : (
          <p className="text-slate-500 text-lg w-full text-center py-10">No products found</p>
        )}
      </div>
    </div>
  );
}
