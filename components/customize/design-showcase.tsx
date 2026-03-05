import Image from "next/image";

interface DesignShowcaseProps {
  titleTh: string;
  titleEn: string;
  subtitle: string;
  imageUrl: string;
}

export function DesignShowcase({ titleTh, titleEn, subtitle, imageUrl }: DesignShowcaseProps) {
  return (
    <section className="border border-[#EBEBEB] bg-white">
      <div className="relative aspect-[16/7] overflow-hidden bg-[#FAFAF8]">
        <Image src={imageUrl} alt={titleEn} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-[10px] font-light tracking-[0.18em] uppercase">Pradap Prada Design</p>
          <p className="mt-1.5 font-serif text-xl italic md:text-2xl">
            {titleTh} ({titleEn})
          </p>
        </div>
      </div>
      <div className="px-6 py-5">
        <p className="text-[12px] font-light leading-relaxed text-[#9A9A9A]">{subtitle}</p>
      </div>
    </section>
  );
}
