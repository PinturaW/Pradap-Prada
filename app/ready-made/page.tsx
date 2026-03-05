"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { MOCK_IMAGE } from "@/lib/placeholder-images";

const readyMade = [
  {
    nameTh: "สร้อยคอ Ruby Halo",
    nameEn: "Ruby Halo Necklace",
    price: "฿6,900",
    image: "/images/red.png",
    tag: "ขายดี",
  },
  {
    nameTh: "แหวน Sapphire Classic",
    nameEn: "Sapphire Classic Ring",
    price: "฿5,900",
    image: "/images/blue.png",
    tag: "ยอดนิยม",
  },
  {
    nameTh: "ต่างหู Yellow Glow",
    nameEn: "Yellow Sapphire Earrings",
    price: "฿4,900",
    image: "/images/yellow.png",
    tag: "ใหม่",
  },
];

export default function ReadyMadePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-muted-foreground md:text-2xl">
            READY-MADE COLLECTION
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-6xl">
            แบบสำเร็จรูป พร้อมเลือกทันที
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed text-muted-foreground md:text-3xl">
            สำหรับลูกค้าที่ต้องการความรวดเร็ว เลือกดีไซน์สำเร็จรูปที่จับคู่พลอยและตัวเรือนให้แล้ว
            สวย จบ ครบ พร้อมสั่งซื้อได้ทันที
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {readyMade.map((item) => (
            <div
              key={item.nameEn}
              className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-luxury"
            >
              <div className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {item.tag}
              </div>
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={item.image || MOCK_IMAGE}
                  alt={item.nameTh}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  {item.nameTh}
                </h3>
                <p className="mt-1 text-lg text-muted-foreground">
                  {item.nameEn}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="price-luxury text-2xl">{item.price}</span>
                  <Link
                    href="/checkout"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    <CheckCircle className="h-4 w-4" />
                    เลือกแบบนี้
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
