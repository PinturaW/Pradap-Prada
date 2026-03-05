import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ตลาดพลอย | Pradap Prada - Gemstone Marketplace",
  description:
    "ตลาดพลอยดิจิทัลจากจังหวัดตราด เลือกชมอัญมณีแท้พร้อมใบรับรองเอกลักษณ์เฉพาะเม็ด",
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
