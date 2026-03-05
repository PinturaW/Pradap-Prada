export default function CareInstructionsPage() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-20">
      <p className="text-[11px] font-light uppercase tracking-[0.2em] text-[#9A9A9A]">Support</p>
      <h1 className="mt-3 font-serif text-4xl font-light italic text-[#2A2A2A]">Care Instructions</h1>
      <p className="mt-5 max-w-3xl text-[15px] font-light leading-relaxed text-[#6A6A6A]">
        Proper care keeps your jewelry brilliant for years. Follow these simple routines for daily wear and long-term storage.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="border border-[#EBEBEB] bg-[#FAFAF8] p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Daily Wear Tips</p>
          <ul className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>• Put on jewelry after perfume, lotion, and hairspray.</li>
            <li>• Remove before showering, swimming, or exercise.</li>
            <li>• Avoid impact against hard surfaces.</li>
            <li>• Wipe gently with a soft cloth after use.</li>
          </ul>
        </div>

        <div className="border border-[#EBEBEB] bg-white p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Storage Guide</p>
          <ul className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>• Store each piece separately to prevent scratches.</li>
            <li>• Keep in a dry pouch or lined jewelry box.</li>
            <li>• Use anti-tarnish strips for silver pieces.</li>
            <li>• Keep away from direct sunlight and humidity.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border border-[#EBEBEB] p-6">
        <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Cleaning & Maintenance</p>
        <div className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
          <p>• Use lukewarm water, mild soap, and a soft brush for occasional cleaning.</p>
          <p>• Dry completely before storing to avoid moisture damage.</p>
          <p>• For delicate stones (e.g. opalescent or porous gems), avoid harsh ultrasonic cleaning.</p>
          <p>• We recommend a professional check-up every 6–12 months for prong and setting safety.</p>
        </div>
      </div>

      <p className="mt-8 text-[14px] font-light text-[#9A9A9A]">Professional cleaning and condition check service is available on request.</p>
    </section>
  );
}
