export default function ReturnsExchangePage() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-20">
      <p className="text-[11px] font-light uppercase tracking-[0.2em] text-[#9A9A9A]">Support</p>
      <h1 className="mt-3 font-serif text-4xl font-light italic text-[#2A2A2A]">Returns & Exchange</h1>
      <p className="mt-5 max-w-3xl text-[15px] font-light leading-relaxed text-[#6A6A6A]">
        We accept returns or exchanges for eligible items in original condition. Custom-made pieces are reviewed case by case depending on production stage and personalization level.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="border border-[#EBEBEB] bg-[#FAFAF8] p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Eligibility</p>
          <ul className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>• Request within 7 days after delivery.</li>
            <li>• Item must be unworn and in original condition.</li>
            <li>• Include original packaging and certificate.</li>
            <li>• Custom pieces are assessed individually.</li>
          </ul>
        </div>

        <div className="border border-[#EBEBEB] bg-white p-6">
          <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">Not Eligible</p>
          <ul className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
            <li>• Items with visible wear or damage by misuse.</li>
            <li>• Missing certificate, tag, or original packaging.</li>
            <li>• Fully personalized pieces after final approval.</li>
            <li>• Requests submitted after the return window.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border border-[#EBEBEB] p-6">
        <p className="text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">How To Request</p>
        <ol className="mt-3 space-y-2 text-[14px] font-light leading-relaxed text-[#6A6A6A]">
          <li>1. Contact support with your order number and reason.</li>
          <li>2. Share photos if there is any issue or defect.</li>
          <li>3. Wait for approval and shipping instructions.</li>
          <li>4. Send the item back securely packaged.</li>
          <li>5. Receive exchange or refund status after inspection.</li>
        </ol>
      </div>

      <p className="mt-8 text-[14px] font-light text-[#9A9A9A]">Our team will guide you through each step and estimated timeline once your request is received.</p>
    </section>
  );
}
