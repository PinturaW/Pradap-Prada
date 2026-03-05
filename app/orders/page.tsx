"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Cog, Truck, Package } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { gemPowerData, gemTypeDisplayData, type GemType } from "@/lib/gem-data";
import {
  clearAuthUser,
  ensureDefaultUsers,
  getAuthUser,
  getOrders,
  type AuthUser,
  type StoredOrder,
} from "@/lib/account-storage";

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getOrderProgress(order: StoredOrder) {
  if (order.productionStatus && order.shippingStatus) {
    return {
      productionStatus: order.productionStatus,
      shippingStatus: order.shippingStatus,
    };
  }

  const createdAtMs = new Date(order.createdAt).getTime();
  const nowMs = Date.now();
  const elapsedDays = Math.max(0, Math.floor((nowMs - createdAtMs) / (1000 * 60 * 60 * 24)));

  if (elapsedDays >= 5) {
    return { productionStatus: "completed" as const, shippingStatus: "delivered" as const };
  }
  if (elapsedDays >= 3) {
    return { productionStatus: "completed" as const, shippingStatus: "in-transit" as const };
  }
  if (elapsedDays >= 1) {
    return { productionStatus: "quality-check" as const, shippingStatus: "ready-to-ship" as const };
  }
  return { productionStatus: "in-production" as const, shippingStatus: "pending" as const };
}

function labelProductionStatus(status: "in-production" | "quality-check" | "completed") {
  if (status === "in-production") return "In production";
  if (status === "quality-check") return "Quality check";
  return "Completed";
}

function labelShippingStatus(status: "pending" | "ready-to-ship" | "in-transit" | "delivered") {
  if (status === "pending") return "Pending";
  if (status === "ready-to-ship") return "Ready to ship";
  if (status === "in-transit") return "In transit";
  return "Delivered";
}

function getTimelineStep(
  productionStatus: "in-production" | "quality-check" | "completed",
  shippingStatus: "pending" | "ready-to-ship" | "in-transit" | "delivered"
) {
  if (shippingStatus === "delivered") return 4;
  if (shippingStatus === "ready-to-ship" || shippingStatus === "in-transit") return 3;
  if (productionStatus === "in-production" || productionStatus === "quality-check" || productionStatus === "completed") {
    return 2;
  }
  return 1;
}

function resolveGemType(order: StoredOrder): GemType | null {
  if (order.gemType && gemPowerData[order.gemType]) return order.gemType;

  const normalizedGemstone = order.gemstone.trim().toLowerCase();
  const matchedEntry = Object.entries(gemTypeDisplayData).find(([, display]) => {
    if (!display) return false;
    return (
      display.nameEn.trim().toLowerCase() === normalizedGemstone ||
      display.nameTh.trim().toLowerCase() === normalizedGemstone
    );
  });

  if (!matchedEntry) return null;
  const [gemType] = matchedEntry;
  return gemType as GemType;
}

export default function OrdersPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    ensureDefaultUsers();
    const auth = getAuthUser();
    setUser(auth);

    const allOrders = getOrders();
    if (!auth) {
      setOrders([]);
      return;
    }

    const userOrders = allOrders.filter(
      (order) => (order.userEmail ?? "").toLowerCase() === auth.email.toLowerCase()
    );
    setOrders(userOrders);
  }, []);

  const hasOrders = useMemo(() => orders.length > 0, [orders]);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 pb-20 pt-[110px]">
        <div className="border-b border-[#EBEBEB] pb-8">
          <p className="text-[11px] font-light tracking-[0.2em] uppercase text-[#9A9A9A]">
            Account
          </p>
          <h1 className="mt-2 font-serif text-4xl font-light text-[#2A2A2A]">Your Orders</h1>
          {user && (
            <p className="mt-2 text-[13px] font-light text-[#9A9A9A]">
              Signed in as {user.email}
            </p>
          )}
        </div>

        {!user ? (
          <div className="mt-10 border border-[#EBEBEB] bg-white p-8 text-center">
            <p className="text-[15px] font-light text-[#2A2A2A]">Please log in to view your orders.</p>
            <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
              <Link
                href="/login?next=/orders"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#2A2A2A] px-6 text-[13px] font-light tracking-[0.08em] text-white transition-colors hover:bg-[#3A3A3A]"
              >
                Go to Login
              </Link>
              <Link
                href="/signup?next=/orders"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#2A2A2A] px-6 text-[13px] font-light tracking-[0.08em] text-[#2A2A2A] transition-colors hover:bg-[#2A2A2A] hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : !hasOrders ? (
          <div className="mt-10 border border-[#EBEBEB] bg-white p-8 text-center">
            <p className="text-[15px] font-light text-[#2A2A2A]">No orders yet.</p>
            <p className="mt-2 text-[13px] font-light text-[#9A9A9A]">
              Start designing your custom piece and your orders will appear here.
            </p>
            <Link
              href="/customize"
              className="mt-5 inline-flex h-11 items-center rounded-full border border-[#2A2A2A] px-6 text-[13px] font-light tracking-[0.08em] text-[#2A2A2A] transition-colors hover:bg-[#2A2A2A] hover:text-white"
            >
              Design Your Piece
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => {
              const resolvedGemType = resolveGemType(order);
              const gemImageSrc = resolvedGemType ? gemPowerData[resolvedGemType]?.unsplashUrl : null;
              const progress = getOrderProgress(order);
              const activeStep = getTimelineStep(progress.productionStatus, progress.shippingStatus);
              const timeline = [
                { id: 1, label: "Confirmed", icon: Check },
                { id: 2, label: "Production", icon: Cog },
                { id: 3, label: "Shipping", icon: Truck },
                { id: 4, label: "Received", icon: Package },
              ];

              return (
              <div key={order.id} className="border border-[#EBEBEB] bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#F0F0F0] pb-4">
                  <div className="flex items-start gap-4">
                    {gemImageSrc && (
                      <div className="relative h-14 w-14 overflow-hidden border border-[#EBEBEB] bg-[#FAFAF8]">
                        <Image src={gemImageSrc} alt={order.gemstone} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                    <p className="text-[11px] font-light tracking-[0.12em] uppercase text-[#9A9A9A]">
                      Order ID
                    </p>
                    <p className="mt-1 text-[14px] font-light text-[#2A2A2A]">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-light text-[#9A9A9A]">{formatDate(order.createdAt)}</p>
                    <p className="mt-1 text-[12px] font-light text-[#8A6C50]">Status: Confirmed</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-[13px] font-light text-[#9A9A9A] sm:grid-cols-2">
                  <div className="sm:col-span-2 border-b border-[#F0F0F0] pb-5 mb-1">
                    <div className="relative mx-auto max-w-4xl px-2">
                      <div className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-[#E8E2DA]" />
                      <div
                        className="absolute left-[12.5%] top-5 h-px bg-[#C4956A] transition-all duration-300"
                        style={{ width: `calc((100% - 25%) * ${(activeStep - 1) / (timeline.length - 1)})` }}
                      />

                      <div className="grid grid-cols-4 gap-2">
                        {timeline.map((step) => {
                        const Icon = step.icon;
                        const completed = step.id <= activeStep;
                        return (
                          <div key={step.id} className="flex flex-col items-center">
                              <div
                                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors ${
                                  completed
                                    ? "border-[#C4956A] bg-[#F8F2ED] text-[#C4956A]"
                                    : "border-[#DCDCDC] bg-white text-[#B0B0B0]"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <p
                                className={`mt-2 text-[13px] font-light tracking-[0.03em] ${
                                  completed ? "text-[#2A2A2A]" : "text-[#9A9A9A]"
                                }`}
                              >
                                {step.label}
                              </p>
                          </div>
                        );
                        })}
                      </div>
                    </div>
                  </div>
                  <p>
                    Design: <span className="text-[#2A2A2A]">{order.designType}</span>
                  </p>
                  <p>
                    Gemstone: <span className="text-[#2A2A2A]">{order.gemstone}</span>
                  </p>
                  <p>
                    Chain: <span className="text-[#2A2A2A]">{order.chainStyle ?? "-"}</span>
                  </p>
                  <p>
                    Pendant: <span className="text-[#2A2A2A]">{order.pendantStyle ?? "-"}</span>
                  </p>
                  <p>
                    Gift: <span className="text-[#2A2A2A]">{order.isGift ? "Yes" : "No"}</span>
                  </p>
                  <p>
                    Total: <span className="text-[#2A2A2A]">฿{order.total.toLocaleString()}</span>
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        )}

        {user && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                clearAuthUser();
                setUser(null);
              }}
              className="text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
            >
              Log out
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
