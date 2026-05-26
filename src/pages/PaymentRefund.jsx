import Seo from "../components/Seo";

export default function PaymentRefund() {
  return (
    <div className="pt-28 pb-12 section-shell max-w-5xl">
      <Seo
        title="Payment and Refund Policy"
        description="Payment and refund information for seafood orders placed with Rameswaram Fresh Seafoods in Trichy."
        path="/payment-refund"
        keywords="seafood payment policy, refund policy trichy fish order, online seafood payment"
      />
      <h1 className="text-3xl md:text-5xl font-extrabold text-rose-700">Payment and Refund Policy</h1>
      <div className="premium-card mt-6 p-6 text-slate-700 space-y-3">
        <p>We accept Cash on Delivery and UPI payments.</p>
        <p>If an item is unavailable after order confirmation, the unavailable item amount will be refunded.</p>
        <p>For payment-related support, contact us directly via phone or WhatsApp.</p>
      </div>
    </div>
  );
}
