import React, { useEffect, useState } from "react";
import api from "../utils/axiosClient";   // <--- using backend baseURL
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { resolveProductImage } from "../utils/imageUrl";

const CLEANING_CATEGORY_KEYWORDS = ["fish", "seafood", "meat", "chicken", "mutton", "prawn", "crab"];
const isCleaningCategory = (name = "") =>
  CLEANING_CATEGORY_KEYWORDS.some((keyword) => String(name).toLowerCase().includes(keyword));

export default function Shop() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [customer, setCustomer] = useState({ name: "", mobile: "", email: "", address: "" });
  const [paymentMode, setPaymentMode] = useState("COD");


  // ================= Fetch Products (Live URL) =================
  useEffect(() => {
    api.get("/products")
       .then((res) => setProducts(res.data.filter(p => p.available)))
       .catch(err => console.log("Fetch Product Error:", err));
  }, []);


  // ================ Add to Cart =================
  const addToCart = (item) => {
    const minQty = item.minOrderQty || (String(item.unit || "kg").toLowerCase() === "kg" ? 0.5 : 1);
    const step = String(item.unit || "kg").toLowerCase() === "kg" ? 0.5 : 1;
    const exists = cart.find(c => c._id === item._id);

    if (exists) {
      setCart(cart.map(c => c._id === item._id ? { ...c, qty: Number((c.qty + step).toFixed(2)) } : c));
      return;
    }

    setCart([...cart, { ...item, qty: minQty }]);
  };


  // =============== UPI Payment ===============
  const payWithUPI = (amount) => {
    const upiId = "9655244550-1@okbizaxis";
    const url = `upi://pay?pa=${upiId}&pn=Rameswaram%20Fresh%20Seafoods&am=${amount}&cu=INR&tn=Seafood Order`;
    window.location.href = url;
  };

  const sendOwnerWhatsApp = (orderId, payload, total) => {
    const SPICE_NUMBER = "8248579662";
    const SEAFOOD_NUMBER = "919655244550";

    const itemsByOwner = payload.items.reduce((map, item) => {
      const owner = item.whatsappNumber === SPICE_NUMBER ? SPICE_NUMBER : SEAFOOD_NUMBER;
      if (!map[owner]) map[owner] = [];
      map[owner].push(item);
      return map;
    }, {});

    Object.entries(itemsByOwner).forEach(([owner, items]) => {
      const ownerSubtotal = items.reduce((sum, i) => sum + (i.total || i.price * i.quantity || 0), 0);
      const hasCleaningItem = items.some((i) =>
        isCleaningCategory(i.categoryName || i.category || i.categoryId?.name || "")
      );
      const cleaningLine = hasCleaningItem ? `Cut and Cleaning Charge: Rs ${payload.cleaningCharge}\n` : "";
      const ownerTotal = ownerSubtotal + (hasCleaningItem ? payload.cleaningCharge : 0) + payload.deliveryCharge;
      const itemsText = items
        .map((i) => `- ${i.name} x ${i.quantity} ${i.unit || ""} = Rs ${i.total}`)
        .join("\n");

      const message = `New Order Received\n------------------------------\nOrder ID: ${orderId}\nCustomer: ${payload.customerName}\nMobile: ${payload.customerMobile}\nAddress: ${payload.customerAddress}\nItems:\n${itemsText}\nPayment Mode: Online Payment (UPI)\nPayment Status: Paid\nSubtotal: Rs ${ownerSubtotal}\n${cleaningLine}Delivery Charge: Rs ${payload.deliveryCharge}\nTotal Amount: Rs ${ownerTotal}\n------------------------------\nPlease confirm this order.`;

      window.open(`https://wa.me/${owner}?text=${encodeURIComponent(message)}`, "_blank");
    });
  };


  // =============== Place Order (LIVE BACKEND) ===============
  const placeOrder = async () => {
    if (!customer.name || !customer.mobile || !customer.address)
      return alert("Please fill customer details");

    const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
    const hasCleaningItem = cart.some((item) =>
      isCleaningCategory(item?.categoryName || item?.category || item?.categoryId?.name || "")
    );
    const cleaningCharge = hasCleaningItem ? 20 : 0;
    const deliveryCharge = 20;
    const total = subtotal + cleaningCharge + deliveryCharge;

    const orderData = {
      customerName: customer.name,
      customerMobile: customer.mobile,
      customerEmail: customer.email || user?.email || "",
      customerAddress: customer.address,
      paymentMode,
      subtotalAmount: subtotal,
      cleaningCharge,
      deliveryCharge,
      items: cart.map(c => ({
        productId: c._id,
        name: c.name,
        price: c.price,
        quantity: c.qty,
        whatsappNumber: c.whatsappNumber || "919655244550",
        unit: c.unit || "",
        total: c.qty * c.price,
        categoryName: c?.categoryName || c?.category || c?.categoryId?.name || ""
      })),
    };

    const { data } = await api.post("/orders/create", orderData);
    const orderId = data?.orderId;

    if (paymentMode==="UPI") {
      if (orderId) {
        sendOwnerWhatsApp(orderId, orderData, total);
      }
      payWithUPI(total);
    }

    alert("🎉 Order placed successfully!");
    setCart([]);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto pt-24">

      {/* BACK BUTTON */}
      <Link to="/" className="bg-black text-white px-4 py-2 rounded mb-6 inline-block">
        ⬅ Back
      </Link>

      <h1 className="text-3xl font-bold mb-6">🛍 Fresh Meat & Seafood</h1>


      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-wrap gap-3 mb-6 items-center max-w-5xl">

        <input
          placeholder="Search fish/meat..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border p-3 rounded flex-1 min-w-[260px]"
        />

        <select
          value={categoryFilter}
          onChange={(e)=>setCategoryFilter(e.target.value)}
          className="border p-3 rounded w-40"
        >
          <option value="All">All</option>
          {[...new Set(products.map(p => p.categoryId?.name))].map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button
          onClick={()=>{ setSearch(""); setCategoryFilter("All"); }}
          className="px-4 bg-gray-300 rounded h-[48px]"
        >Clear</button>

      </div>


      {/* ================= PRODUCT GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-24">

        {products
          .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
          .filter(p => categoryFilter==="All" || p.categoryId?.name===categoryFilter)
          .map(p => (
            <div key={p._id} className="border p-3 shadow rounded text-center hover:shadow-xl">

              <img
                src={resolveProductImage(p)}
                className="w-full h-56 object-cover rounded mb-3"
              />

              <h2 className="font-bold text-lg">{p.name}</h2>
              <p className="text-green-700 font-semibold">₹{p.price}/{p.unit}</p>
              {p.minOrderQty > 0 && (
                <p className="text-sm text-slate-500 mt-1">Min order: {p.minOrderQty} {p.unit}</p>
              )}

              <button onClick={()=>addToCart(p)}
                className="bg-orange-500 text-white w-full py-2 mt-2 rounded">
                Add to Cart
              </button>

              <button onClick={()=>setSelectedProduct(p)}
                className="text-blue-700 underline text-sm mt-1">
                View Details
              </button>
            </div>
        ))}

      </div>


      {/* CART FOOTER */}
      {!showForm && cart.length>0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-xl">
          <button
            onClick={()=>setShowForm(true)}
            className="bg-teal-600 text-white w-full py-3 rounded text-lg font-semibold">
            Proceed to Checkout
          </button>
        </div>
      )}


      {/* ================= Checkout Form ================= */}
      {showForm && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-xl z-50">

          <h2 className="font-bold text-lg mb-3">Customer Details</h2>

          <input className="border p-2 w-full mb-2" placeholder="Name"
            onChange={e=>setCustomer({...customer,name:e.target.value})}/>
          <input className="border p-2 w-full mb-2" placeholder="Mobile"
            onChange={e=>setCustomer({...customer,mobile:e.target.value})}/>
          <input className="border p-2 w-full mb-2" placeholder="Email (optional)"
            onChange={e=>setCustomer({...customer,email:e.target.value})}/>
          <textarea className="border p-2 w-full mb-2" placeholder="Address"
            onChange={e=>setCustomer({...customer,address:e.target.value})}/>

          <p className="font-semibold mb-2">Select Payment Method:</p>
          <label><input type="radio" checked={paymentMode==="COD"} onChange={()=>setPaymentMode("COD")}/> COD</label><br/>
          <label className="mt-1 block"><input type="radio" name="pay" onChange={()=>setPaymentMode("UPI")}/> Online UPI</label>

          {paymentMode==="UPI" && (
            <button className="bg-purple-600 text-white w-full py-2 rounded mt-3"
              onClick={() => {
                const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
                const hasCleaningItem = cart.some((item) =>
                  isCleaningCategory(item?.categoryName || item?.category || item?.categoryId?.name || "")
                );
                const total = subtotal + (hasCleaningItem ? 20 : 0) + 20;
                payWithUPI(total);
              }}>
              Pay via UPI
            </button>
          )}

          <button onClick={placeOrder}
            className="bg-green-600 text-white w-full py-3 rounded text-lg mt-3">
            Place Order
          </button>
        </div>
      )}

    </div>
  );
}
