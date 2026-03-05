export default function CustomOrdersPage() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-20">
      <p className="text-[11px] font-light uppercase tracking-[0.2em] text-[#9A9A9A]">Support</p>
      <h1 className="mt-3 font-serif text-4xl font-light italic text-[#2A2A2A]">Custom Orders</h1>
      <p className="mt-5 max-w-3xl text-[15px] font-light leading-relaxed text-[#6A6A6A]">
        Share your idea, preferred gemstone, metal, and target budget. Our team will guide you from concept to finished piece with a clear timeline and approval process.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="border border-[#EBEBEB] bg-[#FAFAF8] p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">How It Works</p>
          <ol className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>1. Share references, preferred gem type, and approximate budget.</li>
            <li>2. Receive design direction and a preliminary quotation.</li>
            <li>3. Confirm stone and setting details before production.</li>
            <li>4. Final craftsmanship, quality check, and delivery update.</li>
          </ol>
        </div>

        <div className="border border-[#EBEBEB] bg-white p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Typical Timeline</p>
          <ul className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>• Consultation and direction: 1–2 business days</li>
            <li>• Final design confirmation: 2–5 business days</li>
            <li>• Production: 14–21 days (depends on complexity)</li>
            <li>• Shipping notification after final QC</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border border-[#EBEBEB] p-6">
        <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">What To Prepare</p>
        <div className="mt-3 grid gap-2 text-[14px] font-light text-[#6A6A6A] md:grid-cols-2">
          <p>• Inspiration photos or style references</p>
          <p>• Desired jewelry type and metal tone</p>
          <p>• Gem preference (color / power / shape)</p>
          <p>• Ideal delivery date and budget range</p>
        </div>
      </div>

      <p className="mt-8 text-[14px] font-light text-[#9A9A9A]">
        Contact us at <span className="text-[#2A2A2A]">iberico.th@gmail.com</span> or <span className="text-[#2A2A2A]">+66 82 010 8685</span>.
      </p>
    </section>
  );
}
