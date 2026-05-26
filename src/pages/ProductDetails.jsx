import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axiosClient";
import { useCart } from "../store/cartStore";
import { resolveImageUrl } from "../utils/imageUrl";
import Loader from "../components/Loader";
import Seo from "../components/Seo";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCart((s) => s.addToCart);
  const toggleCart = useCart((s) => s.toggleCart);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        const isKg = String(res.data.unit || "kg").toLowerCase() === "kg";
        const isParuppu = String(res.data.name || res.data.productName || "").toLowerCase().includes("paruppu") ||
          String(res.data.name || res.data.productName || "").toLowerCase().includes("parupoo");
        const minQty = isParuppu
          ? Math.max(res.data.minOrderQty && Number(res.data.minOrderQty) > 0 ? Number(res.data.minOrderQty) : 3, 3)
          : res.data.minOrderQty && Number(res.data.minOrderQty) > 0
          ? Number(res.data.minOrderQty)
          : isKg
          ? 0.5
          : 1;
        setQuantity(minQty);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <Loader label="Loading product details..." />;
  const imageList = product.images?.length ? product.images : product.image ? [product.image] : [];

  const isKg = String(product.unit || "kg").toLowerCase() === "kg";
  const isParuppu = String(product.name || product.productName || "").toLowerCase().includes("paruppu") || String(product.name || product.productName || "").toLowerCase().includes("parupoo");
  const hasCustomMinQty = product?.minOrderQty && Number(product.minOrderQty) > 0;
  const minOrderQty = isParuppu
    ? 3
    : hasCustomMinQty
    ? Number(product.minOrderQty)
    : isKg
    ? 0.5
    : 1;
  const qtyStep = isParuppu ? 1 : isKg && minOrderQty < 1 ? 0.5 : 1;
  const quantityOptions = isKg
    ? Array.from(
        { length: Math.floor((25 - minOrderQty) / qtyStep) + 1 },
        (_, index) => Number((minOrderQty + index * qtyStep).toFixed(2))
      )
    : [minOrderQty, minOrderQty + 1, minOrderQty + 2, minOrderQty + 3, minOrderQty + 4];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      unit: product.unit || "kg",
    });
    toggleCart();
  };

  const hasDescription = String(product.description || "").trim().length > 0;
  const categoryName = product?.categoryId?.name || product?.categoryName || "Seafood";
  const seoDescription = `Buy ${product.name} online in Trichy from Rameswaram Fresh Seafoods. Category: ${categoryName}. Hygienic handling and doorstep delivery.`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: hasDescription
      ? product.description
      : `${product.name} available for seafood delivery in Trichy with quality handling.`,
    brand: "Rameswaram Fresh Seafoods",
    image: imageList.length ? resolveImageUrl(imageList[0]) : "https://rameswaram-seafoods.vercel.app/logo.png",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: Number(product.price || 0),
      availability: "https://schema.org/InStock",
      url: `https://rameswaram-seafoods.vercel.app/product/${id}`,
    },
  };

  return (
    <div className="section-shell max-w-5xl p-1 pt-30 pb-10">
      <Seo
        title={`${product.name} in Trichy`}
        description={seoDescription}
        path={`/product/${id}`}
        keywords={`${product.name} trichy, buy ${product.name} online trichy, seafood delivery trichy`}
      />
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <div className="premium-card p-4 md:p-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1.5 text-rose-700 font-semibold text-sm px-3 py-2 rounded-lg border border-rose-200 hover:bg-rose-50 transition mb-4"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Home</span>
        </button>

        <div className="flex gap-3 overflow-x-auto pb-3">
          {imageList.map((img, i) => (
            <img
              key={i}
              src={resolveImageUrl(img)}
              alt={`${product.name} ${i + 1}`}
              className="h-56 md:h-72 rounded-xl shadow-md object-cover"
            />
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold mt-4">{product.name}</h1>

        <p className="text-rose-700 text-xl font-bold mt-2">
          Rs {product.price} / {product.unit || "kg"}
        </p>

        {minOrderQty > 0 && (
          <p className="text-sm text-slate-600 mt-1">Minimum order: {minOrderQty} {product.unit || "kg"}</p>
        )}

        <p className="mt-4 text-slate-600 leading-relaxed">
          {hasDescription
            ? product.description
            : `${product.name} is available for seafood home delivery in Trichy. Freshly handled and packed for quality.`}
        </p>

        <div className="mt-5 p-4 rounded-xl bg-rose-50 border border-rose-100 text-sm text-slate-700">
          <p><strong>Category:</strong> {categoryName}</p>
          <p className="mt-1"><strong>Best For:</strong> Fry, curry, and home-style seafood cooking.</p>
          <p className="mt-1"><strong>Service:</strong> Fresh packing with optional cleaning for eligible items.</p>
          <p className="mt-1"><strong>Delivery:</strong> Doorstep seafood delivery in Trichy.</p>
        </div>

        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <span className="font-semibold">Quantity:</span>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input-polish p-2.5 min-w-24"
          >
            {quantityOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="text-slate-700 font-medium">{product.unit || "kg"}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-7 animated-gradient-btn w-full text-white py-3.5 rounded-xl text-lg font-bold"
        >
          Add {quantity} {product.unit || "kg"} to Cart
        </button>
      </div>
    </div>
  );
}
