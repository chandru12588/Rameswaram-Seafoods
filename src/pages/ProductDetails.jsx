import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axiosClient";
import { useCart } from "../store/cartStore";
import { resolveImageUrl } from "../utils/imageUrl";

export default function ProductDetails() {
  const { id } = useParams();
  const addToCart = useCart((s) => s.addToCart);
  const toggleCart = useCart((s) => s.toggleCart);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <div className="text-center p-20 text-lg">Loading...</div>;
  const imageList = product.images?.length ? product.images : product.image ? [product.image] : [];

  const isKg = String(product.unit || "kg").toLowerCase() === "kg";
  const quantityOptions = isKg ? [0.5, 1, 1.5, 2, 2.5, 3] : [1, 2, 3, 4, 5];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      unit: product.unit || "kg",
    });
    toggleCart();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-32">
      <div className="flex gap-3 overflow-x-auto pb-3">
        {imageList.map((img, i) => (
          <img
            key={i}
            src={resolveImageUrl(img)}
            className="h-60 rounded shadow-md object-cover"
            onError={(e) => {
              e.currentTarget.src = "/logo.png";
            }}
          />
        ))}
      </div>

      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>

      <p className="text-teal-700 text-xl font-semibold mt-2">
        Rs {product.price} / {product.unit || "kg"}
      </p>

      <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

      <div className="mt-6 flex items-center gap-3">
        <span className="font-semibold">Quantity:</span>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {quantityOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span className="text-gray-700">{product.unit || "kg"}</span>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-7 bg-teal-600 w-full text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-700"
      >
        Add {quantity} {product.unit || "kg"} to Cart
      </button>
    </div>
  );
}
