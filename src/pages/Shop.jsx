import React, { useEffect, useState } from "react";
import api from "../utils/axiosClient";   // <--- using backend baseURL
import { Link } from "react-router-dom";

export default function Shop() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [customer, setCustomer] = useState({ name: "", mobile: "", address: "" });
  const [paymentMode, setPaymentMode] = useState("COD");


  // ================= Fetch Products (Live URL) =================
  useEffect(() => {
    api.get("/products")
       .then((res) => setProducts(res.data.filter(p => p.available)))
       .catch(err => console.log("Fetch Product Error:", err));
  }, []);


  // ================ Add to Cart =================
  const addToCart = (item) => {
    const exists = cart.find(c => c._id === item._id);
    exists
      ? setCart(cart.map(c => c._id === item._id ? { ...c, qty:c.qty+1 } : c))
      : setCart([...cart, { ...item, qty:1 }]);
  };


  // =============== UPI Payment ===============
  const payWithUPI = (amount) => {
    const upiId = "9655244550-1@okbizaxis";
    const url = `upi://pay?pa=${upiId}&pn=RMS%20Seafoods&am=${amount}&cu=INR&tn=Seafood Order`;
    window.location.href = url;
  };


  // =============== Place Order (LIVE BACKEND) ===============
  const placeOrder = async () => {
    if (!customer.name || !customer.mobile || !customer.address)
      return alert("Please fill customer details");

    const orderData = {
      customerName: customer.name,
      customerMobile: customer.mobile,
      customerAddress: customer.address,
      paymentMode,
      items: cart.map(c => ({
        productId:c._id,
        name:c.name,
        price:c.price,
        quantity:c.qty,
        total:c.qty*c.price
      })),
      totalAmount: cart.reduce((t,i)=>t+i.qty*i.price,0),
    };

    await api.post("/orders/create", orderData);

    if (paymentMode==="UPI") 
      payWithUPI(orderData.totalAmount);

    alert("🎉 Order placed successfully!");
    setCart([]);
    setShowForm(false);
  };


  const backend = "https://rms-backend-44od.onrender.com";   // <--- for images


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
                src={`${backend}/uploads/${p.images?.[0] || p.image}`}
                className="w-full h-56 object-cover rounded mb-3"
              />

              <h2 className="font-bold text-lg">{p.name}</h2>
              <p className="text-green-700 font-semibold">₹{p.price}/{p.unit}</p>

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
          <textarea className="border p-2 w-full mb-2" placeholder="Address"
            onChange={e=>setCustomer({...customer,address:e.target.value})}/>

          <p className="font-semibold mb-2">Select Payment Method:</p>
          <label><input type="radio" checked={paymentMode==="COD"} onChange={()=>setPaymentMode("COD")}/> COD</label><br/>
          <label className="mt-1 block"><input type="radio" name="pay" onChange={()=>setPaymentMode("UPI")}/> Online UPI</label>

          {paymentMode==="UPI" && (
            <button className="bg-purple-600 text-white w-full py-2 rounded mt-3"
              onClick={()=>payWithUPI(cart.reduce((t,i)=>t+i.qty*i.price,0))}>
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
