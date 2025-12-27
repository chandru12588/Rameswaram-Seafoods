import React, { useEffect, useState } from "react";
import api from "../utils/axiosClient";
import ProductCard from "../components/ProductCard";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [search,setSearch] = useState("");
  const [categoryFilter,setCategoryFilter] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  // Category List Auto
  const categories = [...new Set(products.map(p=>p.categoryId?.name))];

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => categoryFilter==="All" || p.categoryId?.name===categoryFilter);


  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto">

      <h2 className="text-3xl font-bold mb-6">🛍 Fresh Meat & Seafood</h2>

      {/* -------- Search + Filter -------- */}
      <div className="flex gap-3 mb-6 flex-wrap">

        <input
          placeholder="Search fish/meat..."
          className="border p-3 rounded flex-1 min-w-[260px]"
          onChange={(e)=>setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded"
          value={categoryFilter}
          onChange={(e)=>setCategoryFilter(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <button
          onClick={()=>{ setSearch(""); setCategoryFilter("All"); }}
          className="px-4 bg-gray-300 rounded"
        >
          Clear
        </button>

      </div>

      {/* -------- Product Grid -------- */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length>0 ?
          filteredProducts.map(p => <ProductCard key={p._id} item={p}/> )
          :
          <p className="text-gray-500 text-lg w-full text-center">No products found</p>
        }
      </div>
      
    </div>
  );
}
