export default function SizingGuidePage() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-20">
      <p className="text-[11px] font-light uppercase tracking-[0.2em] text-[#9A9A9A]">Support</p>
      <h1 className="mt-3 font-serif text-4xl font-light italic text-[#2A2A2A]">Sizing Guide</h1>
      <p className="mt-5 max-w-3xl text-[15px] font-light leading-relaxed text-[#6A6A6A]">
        Accurate sizing helps your piece feel comfortable from day one. Use the guide below to measure before placing your order.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <div className="border border-[#EBEBEB] bg-[#FAFAF8] p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Ring Size</p>
          <ul className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>• Measure inner diameter of a ring you already wear.</li>
            <li>• Or use a paper strip around the finger base.</li>
            <li>• Measure at room temperature for best accuracy.</li>
            <li>• If between sizes, choose the larger size.</li>
          </ul>
        </div>

        <div className="border border-[#EBEBEB] bg-white p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Bracelet Size</p>
          <ul className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>• Measure wrist circumference with a soft tape.</li>
            <li>• Add 1.0–1.5 cm for a close fit.</li>
            <li>• Add 1.5–2.0 cm for a regular fit.</li>
            <li>• Add 2.0+ cm for a loose drape fit.</li>
          </ul>
        </div>

        <div className="border border-[#EBEBEB] bg-white p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Necklace Length</p>
          <ul className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>• 40 cm: sits near collarbone.</li>
            <li>• 45 cm: classic everyday length.</li>
            <li>• 50 cm: lower neckline / layered style.</li>
            <li>• 55+ cm: statement, relaxed silhouette.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border border-[#EBEBEB] p-6">
        <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Need Help?</p>
        <p className="mt-3 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
          If you are unsure, send us your measurements and a quick photo reference. We can recommend the most suitable size before production starts.
        </p>
      </div>

      <p className="mt-8 text-[14px] font-light text-[#9A9A9A]">Message us and we&apos;ll help confirm the best size before production.</p>
    </section>
  );
}
