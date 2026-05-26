import Seo from "../components/Seo";

export default function CleaningPolicy() {
  return (
    <div className="pt-28 pb-12 section-shell max-w-5xl">
      <Seo
        title="Fish Cleaning Policy in Trichy"
        description="Learn about hygienic fish cut and cleaning process from Rameswaram Fresh Seafoods in Trichy."
        path="/cleaning-policy"
        keywords="fish cleaning trichy, seafood cleaning policy, hygienic fish cutting trichy"
      />
      <h1 className="text-3xl md:text-5xl font-extrabold text-rose-700">Fish Cleaning Policy</h1>
      <div className="premium-card mt-6 p-6 text-slate-700 space-y-3">
        <p>We follow hygienic cleaning standards for seafood items eligible for cut and clean support.</p>
        <p>Cleaning charges may apply for selected categories and are shown during checkout.</p>
        <p>Please mention special cut instructions in item notes while ordering.</p>
      </div>
    </div>
  );
}
